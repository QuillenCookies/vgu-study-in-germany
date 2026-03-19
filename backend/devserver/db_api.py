import requests
import xml.etree.ElementTree as elementTree
from datetime import datetime

class DBApi:
    def __init__(self, client_id, client_secret):
        self.client_id = client_id
        self.client_secret = client_secret
        self.headers = {
            "DB-Api-Key": self.client_secret,
            "DB-Client-Id": self.client_id,
        }
        
    def get_timetable(self, eva_nr: str):
        date_string = datetime.now().strftime("%y%m%d")
        hour_string = datetime.now().strftime("%H")
        
        # 1. Get Plan
        res = requests.get(
            f"https://apis.deutschebahn.com/db-api-marketplace/apis/timetables/v1/plan/{eva_nr}/{date_string}/{hour_string}",
            headers=self.headers,
            timeout=10
        )
        if res.status_code != 200:
            raise Exception(f"DB API Plan Error: {res.status_code} {res.text}")
            
        trains = {}
        root = elementTree.fromstring(res.text)
        for s in root.findall('s'):
            train_id = s.get('id')
            train = {'id': train_id, 'train_line': '', 'train_type': '', 'train_number': '', 'departure': '', 'stations': '', 'delay_departure': None}
            
            tl = s.find('tl')
            if tl is not None:
                train['train_type'] = tl.get('c', '')
                train['train_number'] = tl.get('n', '')
                
            dp = s.find('dp')
            if dp is not None:
                train['departure'] = dp.get('pt', '')
                train['stations'] = dp.get('ppth', '')
                train['train_line'] = dp.get('l', '')
                
            if train['departure']:
                trains[train_id] = train
                
        # 2. Get Changes (Delays)
        try:
            res_changes = requests.get(
                f"https://apis.deutschebahn.com/db-api-marketplace/apis/timetables/v1/fchg/{eva_nr}",
                headers=self.headers,
                timeout=5
            )
            if res_changes.status_code == 200:
                root_changes = elementTree.fromstring(res_changes.text)
                for s in root_changes.findall('s'):
                    train_id = s.get('id')
                    if train_id in trains:
                        dp = s.find('dp')
                        if dp is not None and dp.get('ct'):
                            trains[train_id]['delay_departure'] = dp.get('ct')
        except Exception as e:
            print(f"Warning: Failed to fetch changes: {e}")
            
        return list(trains.values())
        
    def find_station_eva(self, name: str) -> str:
        try:
            res = requests.get(f"https://apis.deutschebahn.com/db-api-marketplace/apis/timetables/v1/station/{name}", headers=self.headers, timeout=5)
            if res.status_code == 200:
                root = elementTree.fromstring(res.text)
                station = root.find('station')
                if station is not None:
                    return station.get('eva', '8000105')
        except Exception as e:
            print(f"Station fetching error: {e}")
            
        # Fallbacks for known stations
        if "Frankfurt" in name:
            return "8000105"  # Frankfurt(Main)Hbf
            
        return "8000105"
