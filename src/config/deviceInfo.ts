

// tslint:disable: max-line-length

interface Info {
    browserWindowSize: string;
    userAgent: string;
    platform: string;
}

const device: { [index: string]: Info } = {
    'iphone_6s': {
        browserWindowSize: '414x736',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4',
        platform: 'mobile_ios'
    },
    'iphone_6': {
        browserWindowSize: '385x792',
        userAgent: 'Apple-iPhone7C2/1202.466',
        platform: 'mobile_ios'
    },
    'Samsung_Galaxy_Grand_Prime_SM-G530H': {
        browserWindowSize: '360x640',
        userAgent: 'Mozilla/5.0 (Linux; Android 4.4.4; SM-G530H Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 CoolBrowser/33.0.0.0 Mobile Safari/537.36',
        platform: 'mobile_android'
    },
    'Samsung_SM-G531H_Galaxy_Grand_Prime': {
        browserWindowSize: '360x640',
        userAgent: 'Mozilla/5.0 (Linux; Android 5.1.1; SM-G531H Build/LMY48B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.64 Mobile Safari/537.36 OPR/33.0.2002.97426',
        platform: 'mobile_android'
    },
    'LG_D680_G_Pro_Lite': {
        browserWindowSize: '414x736',
        userAgent: 'Mozilla/5.0 (Linux; U; Android 4.4.2; xx; LG-D680 Build/KOT49I) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.1599.103 Mobile Safari/537.36',
        platform: 'mobile_android'
    },
    'Samsung_SM-J700F_Galaxy_J7': {
        browserWindowSize: '414x736',
        userAgent: 'Mozilla/5.0 (Linux; Android 5.1.1; SM-J700F Build/LMY48B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.83 Mobile Safari/537.36',
        platform: 'mobile_android'
    },

    'Samsung_SM-J500M_Galaxy_J5': {
        browserWindowSize: '414x736',
        userAgent: 'Mozilla/5.0 (Linux; Android 5.1.1; SAMSUNG SM-J5007 Build/LMY48B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/3.3 Chrome/38.0.2125.102 Mobile Safari/537.36',
        platform: 'mobile_android'
    },

    'Samsung_SM-G925I_Galaxy_S6_Edge': {
        browserWindowSize: '370x765',
        userAgent: 'Mozilla/5.0 (Linux; Android 5.1.1; SAMSUNG SM-G925I Build/LMY47X) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/4.0 Chrome/44.0.2403.133 Mobile Safari/537.36',
        platform: 'mobile_android'
    },

    'Huawei_G7-L03_Ascend_G760-L03': {
        browserWindowSize: '414x736',
        userAgent: 'Mozilla/5.0 (Linux; Android 5.1.1; SAMSUNG SM-G925I Build/LMY47X) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/4.0 Chrome/44.0.2403.133 Mobile Safari/537.36',
        platform: 'mobile_android'
    },
    'ZTE_Blade_L2_Plus': {
        browserWindowSize: '360x640',
        userAgent: 'Mozilla/5.0 (Linux; Android 5.1.1; ZTE Blade L2 Plus AppleWebKit/537.36 (KHTML, like Gecko) ZTE/4.0 Chrome/44.0.2403.133 Mobile Safari/537.36',
        platform: 'mobile_android'
    },

    'ZTE_Blade_L2': {
        browserWindowSize: '360x640',
        userAgent: 'Mozilla/5.0 (Linux; Android 4.2.2; ZTE Blade L2 Build/JDQ39) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.83 Mobile Safari/537.36',
        platform: 'mobile_android'
    },

    'Samsung_SM-E500M_Galaxy_E5': {
        browserWindowSize: '360x640',
        userAgent: 'Mozilla/5.0 (Linux; Android 4.4.4; SM-E500H Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.93 Mobile Safari/537.36',
        platform: 'mobile_android'
    },

    'Samsung_SM-A500M_Galaxy_A5': {
        browserWindowSize: '360x640',
        userAgent: 'Mozilla/5.0 (Linux; Android 4.4.4; SM-A500M Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.95 Mobile Safari/537.36',
        platform: 'mobile_android'
    },

    'LG_D373.browserWindowSize': {
        browserWindowSize: '360x640',
        userAgent: 'Mozilla/5.0 (Linux; Android 4.4.2; LG-D373 Build/KOT49I.A1441785091) AppleWebKit/537.36 (KHTML like Gecko) Chrome/45.0.2454.94 Mobile Safari/537.36',
        platform: 'mobile_android'
    },

    'Motorola_XT1021_Moto_E': {
        browserWindowSize: '360x640',
        userAgent: 'Mozilla/5.0 (Linux; Android 5.1; XT1528 Build/LPI23.29-17; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/44.0.2403.90 Mobile Safari/537.36',
        platform: 'mobile_android'
    },

    'Huawei_Y520-U03': {
        browserWindowSize: '360x640',
        userAgent: 'Mozilla/5.0 (Linux; Android 4.4.2; HUAWEI Y520-U03 Build/HUAWEIY520-U03) AppleWebKit/537.36 (KHTML like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36',
        platform: 'mobile_android'
    },

    'LG_D280': {
        browserWindowSize: '360x640',
        userAgent: 'Mozilla/5.0 (Linux; Android 4.4.2; LG-D280 Build/KOT49I.A1397152590) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.103 Mobile Safari/537.36',
        platform: 'mobile_android'
    },

    'Sony_e2104_Xperia_E4': {
        browserWindowSize: '360x640',
        userAgent: 'Mozilla/5.0 (Linux; Android 4.4.2; D2005 Build/20.1.A.2.13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.93 Mobile Safari/537.36',
        platform: 'mobile_android'
    },

    'Samsung_GT-I9195L_Galaxy_S4_Mini': {
        browserWindowSize: '360x640',
        userAgent: 'Mozilla/5.0 (Linux; Android 4.2.2; GT-I9195 Build/JDQ39) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.83 Mobile Safari/537.36',
        platform: 'mobile_android'
    },

    'Samsung_SM-G920I_Galaxy_S6': {
        browserWindowSize: '370x765',
        userAgent: 'Mozilla/5.0 (Linux; Android 5.1.1; SAMSUNG SM-G920I Build/LMY47X) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/4.0 Chrome/44.0.2403.133 Mobile Safari/537.36',
        platform: 'mobile_android'
    },

    'Samsung_GT-I9060M_Galaxy_Grand_Neo_Plus': {
        browserWindowSize: '360x640',
        userAgent: 'Mozilla/5.0 (Linux; Android 4.2.2; GT-I9060 Build/JDQ39) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.109 Mobile Safari/537.36',
        platform: 'mobile_android'
    },

    'Samsung_SM-G355M_Galaxy_Core_II_Duos': {
        browserWindowSize: '360x640',
        userAgent: 'Mozilla/5.0 (Linux; Android 4.2.2; GT-I9060 Build/JDQ39) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.109 Mobile Safari/537.36',
        platform: 'mobile_android'
    },

    'LG_D693n_G3': {
        browserWindowSize: '414x736',
        userAgent: 'Mozilla/5.0 (Linux; Android 4.4.2; LG-D693n Build/KOT49I.A1401874790) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.103 Mobile Safari/537.36',
        platform: 'mobile_android'
    },

    'Huawei_Y635-L03': {
        browserWindowSize: '360x640',
        userAgent: 'Mozilla/5.0 (Linux; Android 4.4.4; es-us; HUAWEI Y635-L03 Build/HuaweiY635-L03)AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/33.0.0.0 Mobile Safari/537.36',
        platform: 'mobile_android'
    },

    'Samsung_SM-A300H_Galaxy_A3': {
        browserWindowSize: '360x640',
        userAgent: 'Mozilla/5.0 (Linux; Android 4.4.4; SM-A300H Build/KTU84P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.109 Mobile Safari/537.36',
        platform: 'mobile_android'
    },

    'M4_SS4045': {
        browserWindowSize: '360x640',
        userAgent: 'Mozilla/5.0 (Linux; Android 4.4.2; M4 SS4045 Build/KOT49H) AppleWebKit/537.36 (KHTML like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36',
        platform: 'mobile_android'
    },

    'Alcatel_OT-4033A_Pop_C3': {
        browserWindowSize: '360x640',
        userAgent: 'Mozilla/5.0 (Linux; Android 4.2.2; ONE TOUCH 4033A Build/JDQ39) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.114 Mobile Safari/537.36',
        platform: 'mobile_android'
    },

    'Alcatel_ONE_TOUCH_7040A_Pop_C7': {
        browserWindowSize: '360x640',
        userAgent: 'Mozilla/5.0 (Linux; Android 4.2.2; ZTE Blade L2 Build/JDQ39) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.83 Mobile Safari/537.36',
        platform: 'mobile_android'
    },


    'Samsung_SM-G928G_Galaxy_S6_Edge_Plus': {
        browserWindowSize: '360x640',
        userAgent: 'Mozilla/5.0 (Linux; Android 5.1.1; SAMSUNG SM-G928G Build/LMY47X) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/3.4 Chrome/38.0.2125.102 Mobile Safari/537.36',
        platform: 'mobile_android'
    },

    'Sony_Xperia_C6906_Xperia_Z1': {
        browserWindowSize: '360x640',
        userAgent: 'Mozilla/5.0 (Linux; Android 4.3; C6906 Build/14.2.A.1.136) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.59 Mobile Safari/537.36',
        platform: 'mobile_android'
    },

    'ipad_portrait': {
        browserWindowSize: '778x1149',
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 9_3_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13E238 Safari/601',
        platform: 'tablet_portrait'
    },

    'ipad_landscape': {
        browserWindowSize: '1034x893',
        userAgent: 'Mozilla/5.0 (iPad; CPU OS 9_3_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13E238 Safari/601',
        platform: 'tablet_landscape'
    },

    'Samsung_SM-T116_Galaxy_Tab_3V_3G_portrait': {
        browserWindowSize: '610x1149',
        userAgent: 'Mozilla/5.0 (Linux; Android 4.2.2; SM-T116 Build/JDQ39) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.95 Safari/537.36',
        platform: 'tablet_portrait'
    },

    'Samsung_SM-T116_Galaxy_Tab_3V_3G_landscape': {
        browserWindowSize: '1034x725',
        userAgent: 'Mozilla/5.0 (Linux; Android 4.2.2; SM-T116 Build/JDQ39) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.95 Safari/537.36',
        platform: 'tablet_landscape'
    }
};


export default device;
