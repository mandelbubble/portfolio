const constants = {
    resolution : {
        width : 1024,
        height : 768,
    },
    path: '/windows-xp/',
    programs : {
        cmd : {
            resolution : { width : 800 , height : 550 },
            position : {x : (1024 - 800) / 2 , y : ( 768 - 550 ) / 2},
            label: 'Command Prompt',
            icon: '/windows-xp/cmd_icon.png'
        },
        notepad:  {
            label: 'Notepad',
            icon: '/windows-xp/notepad_icon.png',
        }
    }
}

export default constants