const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const CONFIG = {"version":"1.0.0","game":"FreeFire","features":{"aimbot":{"enable":true,"aimlock":{"enable":true,"priority":"nearest","smoothness":0,"lock_after_shot":true,"reset_delay_ms":50},"aimdrag":{"enable":true,"drag_speed_x":0,"drag_speed_y":0,"drag_zone_percent":0,"auto_correct":true},"recoil_control":{"enable":true,"vertical_reduction":1.0,"horizontal_reduction":1.0,"pattern":"none"},"targeting":{"fov_radius":360,"max_distance":500.0,"head_priority":false,"body_part":"chest","visible_check":false}},"stability":{"no_shake":true,"no_bounce":true,"no_over_shoot":true,"sticky_aim":true,"sticky_factor":1.0},"sensitivity":{"override":true,"general":0,"red_dot":0,"2x_scope":0,"4x_scope":0,"sniper_scope":0,"free_look":0},"input":{"mouse":{"dpi":0,"polling_rate":1000,"raw_input":true},"touch":{"dead_zone":0,"swipe_speed":0}},"memory":{"scan_interval_ms":16,"write_delay_ms":1,"use_physical_address":true}},"hotkeys":{"toggle_aimbot":"F1","toggle_aimlock":"F2","toggle_aimdrag":"F3","increase_fov":"NUMPAD_ADD","decrease_fov":"NUMPAD_SUBTRACT"},"logging":{"enable":false,"level":"error","file":"vtd_aim.log"}};

const server = http.createServer((req, res) => {
    const url = req.url;
    console.log('Request:', url);
    
    // Trả về JSON cho MỌI request (kể cả /, /config, /anything)
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': '*'
    });
    
    if (req.method === 'OPTIONS') {
        res.end();
        return;
    }
    
    res.end(JSON.stringify(CONFIG, null, 2));
});

server.listen(PORT, '0.0.0.0', () => {
    console.log('[VTĐZAI] Server running on port ' + PORT);
    console.log('[VTĐZAI] Mọi request đều trả về config JSON');
    console.log('[VTĐZAI] Test: http://localhost:' + PORT);
});
