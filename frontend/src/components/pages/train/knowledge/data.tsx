// frontend/src/components/train/knowledge/data.ts
import React from 'react';

export type KnowledgeCategory = 'Types' | 'Ticket' | 'Culture';

export interface KnowledgeItem {
    id: string;
    category: KnowledgeCategory;
    title: string;
    shortDesc: string;
    longDesc: React.ReactNode;
    image: string;
}

export const knowledgeData: KnowledgeItem[] = [
    // --- TYPES ---
    {
        id: "t1", category: "Types", title: "ICE (Intercity Express)",
        shortDesc: "High-speed flagship trains connecting major German and European cities.",
        image: "https://images.unsplash.com/photo-1527295110-5145f6b148d0?q=80&w=1131&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        longDesc: "The ICE is Deutsche Bahn's fastest and most comfortable train category, reaching speeds up to 300 km/h. They are white with a distinctive red stripe. Important for students: ICE trains are completely excluded from the Deutschlandticket and university Semestertickets. You must buy a specific IC/ICE ticket. Getting caught on an ICE with a local pass results in a steep fine and you will be forced to buy a full-price ticket onboard."
    },
    {
        id: "t2", category: "Types", title: "Regional-Express (RE)",
        shortDesc: "Fast regional trains connecting mid-sized cities and skipping smaller stops.",
        image: "https://media.istockphoto.com/id/1264497261/photo/small-railway-platform-for-passengers-in-local-train-station-with-red-train-heading-to.webp?a=1&b=1&s=612x612&w=0&k=20&c=YYs6UbnUNOy1C-kX91Kj-Ral0U7UMeyi28iWn0jBtAc=",
        longDesc: "RE trains form the backbone of cross-country student travel. They are usually double-decker red trains. They stop only at major stations, making them much faster than RBs. They are fully covered by the Deutschlandticket, meaning you can travel entirely across Germany using only RE trains (though it will take much longer than an ICE)."
    },
    {
        id: "t3", category: "Types", title: "Regionalbahn (RB)",
        shortDesc: "Local regional trains that stop at almost every single station on the route. (Image: Wikipedia)",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Regionalbahn_27.jpg?uselang=fr",
        longDesc: "If you live in a smaller town outside your university city, you will likely commute on an RB. They share the same red branding as RE trains but are slower due to frequent stops. Covered by Semestertickets and Deutschlandtickets."
    },
    {
        id: "t4", category: "Types", title: "S-Bahn (Stadtschnellbahn)",
        shortDesc: "Fast metropolitan transit connecting suburbs to the city center. (Image: Wikimedia)",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Berlin_SBahn_HackescherMarkt_east.jpg",
        longDesc: "The S-Bahn is a hybrid between a subway and a commuter train. They run very frequently (every 10-15 minutes) and are identifiable by a green 'S' logo. They are crucial for daily university commutes and are included in all local student transit passes."
    },
    {
        id: "t5", category: "Types", title: "U-Bahn & Trams",
        shortDesc: "Inner-city underground subways and street-level trams. (Image: Wikimedia)",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/U9_im_U-Bahnhof_Zoologischer_Garten.jpg/960px-U9_im_U-Bahnhof_Zoologischer_Garten.jpg",
        longDesc: "U-Bahns (blue 'U' logo) are underground networks found in larger cities like Frankfurt, Berlin, and Munich. Trams operate on the streets. Both are strictly local transit and operated by the city's specific transit authority (e.g., VGF in Frankfurt), not Deutsche Bahn."
    },

    // --- TICKETS ---
    {
        id: "tk1", category: "Ticket", title: "Deutschlandticket (€49)",
        shortDesc: "The ultimate pass: Travel on all local and regional transit across Germany.",
        image: "https://images.unsplash.com/photo-1606768666853-403c90a981ad?auto=format&fit=crop&w=600&q=80",
        longDesc: "Introduced recently, the D-Ticket is a monthly subscription that allows unlimited travel on all S-Bahns, U-Bahns, buses, trams, RE, and RB trains nationwide. It is a game-changer for students. Note: It is a subscription that automatically renews, so remember to cancel it by the 10th of the month if you are leaving Germany."
    },
    {
        id: "tk2", category: "Ticket", title: "The Semesterticket",
        shortDesc: "Your university transit pass, usually included in your semester fees.",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80",
        longDesc: "When you pay your semester contribution (Semesterbeitrag), a large portion goes toward this ticket. It usually covers your entire federal state (e.g., all of Hessen). Many universities are now upgrading their Semestertickets to full Deutschlandtickets automatically."
    },
    {
        id: "tk3", category: "Ticket", title: "BahnCard 25 & 50",
        shortDesc: "Discount cards for long-distance ICE/IC travel.",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
        longDesc: "If you plan to visit friends in other cities using fast trains, buy a 'My BahnCard' (discounted for those under 27). The BahnCard 25 gives you 25% off all long-distance fares (even the already discounted 'Super Sparpreis' tickets). The BahnCard 50 gives 50% off flexible fares."
    },
    {
        id: "tk4", category: "Ticket", title: "Super Sparpreis",
        shortDesc: "The cheapest way to book an ICE, but with strict rules.",
        image: "https://media.istockphoto.com/id/1269937177/photo/db-logo-on-ice-4-high-speed-train-at-berlin-main-railway-station-hauptbahnhof-hbf-in-germany.jpg?s=612x612&w=0&k=20&c=V4ce47gjM_x0PWVatXr2LS7Xv6ObLRunJM8JfwjHG3U=",
        longDesc: "If you book weeks in advance, you can get ICE tickets for as low as €17.90. However, 'Super Sparpreis' binds you to that exact specific train (Zugbindung). If you miss it because you woke up late, the ticket is entirely invalid and non-refundable."
    },
    {
        id: "tk5", category: "Ticket", title: "Schwarzfahren (Fare Evasion)",
        shortDesc: "Traveling without a valid ticket carries a strict €60 fine.",
        image: "https://media.istockphoto.com/id/1771225938/photo/nein-written-with-chalk-on-slate-shown-by-young-female.jpg?s=612x612&w=0&k=20&c=YRtlY9oNTd74G1NPNxX9E1lvKVr84DaGFOiYUFAaNhk=",
        longDesc: "Unlike some countries without turnstiles, Germany relies on random ticket inspections by plainclothes officers. If caught without a ticket (or with the wrong ticket type), there is zero tolerance. You must pay €60 immediately or via bank transfer, and repeated offenses can lead to criminal charges."
    },

    // --- CULTURE ---
    {
        id: "c1", category: "Culture", title: "The Quiet Zone (Ruhebereich)",
        shortDesc: "Specific ICE cars where talking and phone calls are strictly forbidden.",
        image: "https://media.istockphoto.com/id/1652925032/photo/secret-and-silence-quiet-silent-shh-gesture-with-finger-on-lips-man-doing-expression-with.jpg?s=612x612&w=0&k=20&c=3Rb2GqoEsNvmIa1GKO-BAvwwZl4y2HFtqBJVDQm60aA=",
        longDesc: "When booking an ICE, you can choose the 'Ruhebereich'. In this car, you must silence your phone, use headphones, and refrain from talking. Germans take this very seriously, and other passengers will reprimand you if you are loud here."
    },
    {
        id: "c2", category: "Culture", title: "Umgekehrte Wagenreihung",
        shortDesc: "When the train arrives entirely backwards.",
        image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=600&q=80",
        longDesc: "You will hear this phrase often on loudspeakers. It means the train cars are in the reverse order of what is shown on the platform's layout board. If you booked seat 12 in Car 1, you suddenly have to run to the opposite end of the platform."
    },
    {
        id: "c3", category: "Culture", title: "Platform Etiquette",
        shortDesc: "Let people exit first, and stand on the right on escalators.",
        image: "https://media.istockphoto.com/id/1221345821/vector/people-go-into-subway-train-public-urban-transportation-metro-platform-passengers-trying-to.jpg?s=612x612&w=0&k=20&c=p97ePBbZlF1-GRUppoUCcwxs0pG1BAxMyHbsrRoyocM=",
        longDesc: "Always stand to the side of the train doors and wait until everyone has fully exited before stepping in. On escalators in transit stations, the golden rule is 'Rechts stehen, links gehen' (Stand on the right, walk on the left)."
    },
    {
        id: "c4", category: "Culture", title: "Dealing with Delays",
        shortDesc: "DB is famous for delays. Know your passenger rights.",
        image: "http://media.istockphoto.com/id/892092472/photo/businessman-checking-his-watch-at-train-station.jpg?s=612x612&w=0&k=20&c=62_ESfCuPQxtLlyBdqHQ1Xb9MS9NYmwCBlKqfX3KQ4c=",
        longDesc: "If your ICE/IC is delayed by more than 20 minutes at your destination, your 'Zugbindung' (train-specific tie) is lifted, and you can take any other train. If you arrive 60+ minutes late, you are entitled to a 25% refund via the DB Navigator App."
    },
    {
        id: "c5", category: "Culture", title: "Bicycles on Trains",
        shortDesc: "Rules for taking your bike on board.",
        image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600&q=80",
        longDesc: "You can take bikes on most regional trains and S-bahns (sometimes restricted during rush hour). However, you usually need to buy an extra bicycle ticket. On ICE trains, you must reserve a specific bicycle space weeks in advance."
    },
    {
        id: "c6", category: "Culture", title: "Validating (Entwerten)",
        shortDesc: "Bought a ticket? It might still be invalid if you haven't stamped it.",
        image: "https://images.unsplash.com/photo-1590490359854-dfba19688d70?auto=format&fit=crop&w=600&q=80",
        longDesc: "This is the #1 trap for international students. In many German cities (like Berlin or Munich), a ticket bought from a machine is 'blank.' You must find the small yellow or orange machine on the platform or inside the bus/tram and stamp it to 'validate' (entwerten) the start of your journey. If a controller sees a 10:00 AM ticket at 11:00 AM without a stamp, they will treat it as fare evasion. In Frankfurt (RMV), most tickets are pre-validated, but always check if there is a 'Hier entwerten' arrow on your paper!"
    },
    {
        id: "c7", category: "Culture", title: "The Stop Request (Haltewunsch)",
        shortDesc: "Buses and Trams don't always stop automatically. You have to ask.",
        image: "https://media.istockphoto.com/id/496776338/photo/wooden-sign-board-warning-stop.jpg?s=612x612&w=0&k=20&c=h8xjkGyYSfPomLtk3mbpIX4orQwi2T0L8O52VlWh4NI=",
        longDesc: "In countries like Vietnam, we might wave down a bus, but in Germany, it's all about the button. Inside buses and some trams, you must press the red 'STOP' or 'Wagen hält' button well before your stop. If no one is standing at the bus stop outside and you don't press the button, the driver will simply drive past. Pro tip: The screen at the front will change from 'Nächste Haltestelle' to 'Wagen hält' once the request is registered."
    },
    {
        id: "c8", category: "Culture", title: "Sunday & Holiday Silence",
        shortDesc: "Schedules change drastically on 'Ruhetag' (Rest Day).",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
        longDesc: "Sundays in Germany are quiet. Most shops are closed, and transit runs on a 'Sonntagsfahrplan.' This usually means buses that come every 10 minutes on a weekday might only come every 30 or 60 minutes on a Sunday. Always check the 'S' (Sonntag) column on the physical station timetables. It's the perfect day for a slow trip to a nearby forest, but a terrible day to be in a rush."
    },
    {
        id: "c9", category: "Culture", title: "Smelly Food & Drinking",
        shortDesc: "Keep your Döner for the sidewalk, not the S-Bahn.",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
        longDesc: "While eating on trains isn't strictly illegal on DB, it is socially frowned upon to eat 'strong-smelling' food (like Döner, pizza, or hot noodles) in crowded cars. However, drinking is a different story. In many cities, you’ll see locals having a 'Wegbier' (commuter beer) on the way to a party. Just be careful: some local transit authorities (like HVV in Hamburg or VGN in Nuremberg) have a strict 'No Alcohol' policy with €40 fines."
    },
    {
        id: "c10", category: "Culture", title: "The Safety Strip (Gelbe Linie)",
        shortDesc: "The yellow line isn't a suggestion; it’s a life-saver.",
        image: "https://images.unsplash.com/photo-1444210971048-6130cf0c46cf?auto=format&fit=crop&w=600&q=80",
        longDesc: "When an ICE or a freight train passes through a station without stopping, it creates a massive suction effect. You will notice a textured white or yellow line about 1 meter from the edge of the platform. In Germany, people wait strictly behind this line. Do not cross it until the train has come to a complete stop. Station staff will often use the loudspeaker to yell at people standing too close—save yourself the embarrassment and stay back!"
    }
];