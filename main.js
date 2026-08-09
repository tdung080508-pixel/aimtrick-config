(function(){
    const CONFIG_URL = '/config/v1.0.0.json';
    const API_URL = '/api/config';
    const configDisplay = document.getElementById('configDisplay');
    const statusText = document.getElementById('statusText');
    const statusDot = document.getElementById('statusDot');

    const DEFAULT_CONFIG = {
        "version": "1.0.0",
        "game": "FreeFire",
        "features": {
            "aimbot": {
                "enable": true,
                "aimlock": {"enable": true, "priority": "nearest", "smoothness": 0, "lock_after_shot": true, "reset_delay_ms": 50},
                "aimdrag": {"enable": true, "drag_speed_x": 0, "drag_speed_y": 0, "drag_zone_percent": 0, "auto_correct": true},
                "recoil_control": {"enable": true, "vertical_reduction": 1.0, "horizontal_reduction": 1.0, "pattern": "none"},
                "targeting": {"fov_radius": 360, "max_distance": 500.0, "head_priority": false, "body_part": "chest", "visible_check": false}
            },
            "stability": {"no_shake": true, "no_bounce": true, "no_over_shoot": true, "sticky_aim": true, "sticky_factor": 1.0},
            "sensitivity": {"override": true, "general": 0, "red_dot": 0, "2x_scope": 0, "4x_scope": 0, "sniper_scope": 0, "free_look": 0},
            "input": {"mouse": {"dpi": 0, "polling_rate": 1000, "raw_input": true}, "touch": {"dead_zone": 0, "swipe_speed": 0}},
            "memory": {"scan_interval_ms": 16, "write_delay_ms": 1, "use_physical_address": true}
        },
        "hotkeys": {"toggle_aimbot": "F1", "toggle_aimlock": "F2", "toggle_aimdrag": "F3", "increase_fov": "NUMPAD_ADD", "decrease_fov": "NUMPAD_SUBTRACT"},
        "logging": {"enable": false, "level": "error", "file": "vtd_aim.log"}
    };

    function loadConfig(){
        fetch(CONFIG_URL)
            .then(res => {
                if(!res.ok) throw new Error('HTTP ' + res.status);
                return res.json();
            })
            .then(data => {
                configDisplay.textContent = JSON.stringify(data, null, 4);
                statusText.textContent = '✅ Config đã tải - ' + new Date().toLocaleTimeString();
                statusDot.style.background = '#00ff41';
            })
            .catch(err => {
                configDisplay.textContent = '// LỖI: ' + err.message + '\n// Tạo config mặc định...\n' + JSON.stringify(DEFAULT_CONFIG, null, 4);
                statusText.textContent = '⚠️ Lỗi tải - dùng mặc định';
                statusDot.style.background = '#ff8800';
            });
    }

    function exportConfig(){
        fetch(CONFIG_URL)
            .then(res => res.json())
            .then(data => {
                const blob = new Blob([JSON.stringify(data, null, 4)], {type: 'application/json'});
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'config_vtd_freefire.json';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            })
            .catch(() => {
                const blob = new Blob([JSON.stringify(DEFAULT_CONFIG, null, 4)], {type: 'application/json'});
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'config_vtd_freefire.json';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });
    }

    document.getElementById('refreshBtn').addEventListener('click', loadConfig);
    document.getElementById('exportBtn').addEventListener('click', exportConfig);
    loadConfig();
})();
