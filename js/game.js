var screenRatio = 480 / 640;
var dpi_w = window.innerHeight * screenRatio / 480;
var dpi_h = window.innerHeight / 640;
var canvas_height = window.innerHeight * (dpi_w / dpi_h);
var canvas_width = canvas_height * screenRatio;

var config = {
  type: Phaser.AUTO,
  width: 480, //canvas_width, //window.innerWidth * window.devicePixelRatio,
  height: 700, //canvas_height,//window.innerHeight * window.devicePixelRatio,
  backgroundColor: "white",
  transparent: true,
  parent: 'phaser-example',
  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 0 }
    }
  },
  scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
  },
  dom: { createContainer: true },
  scene: [
    // {preload: preload,
    //  create: create},
  	// SceneMainMenu,
    SceneMain,
    SceneGameOver,
    SceneFallingSpaceShip,
    SceneVisualNovel
    ],
  pixelArt: true,
  roundPixels: true
};

var element;
var game = new Phaser.Game(config);

// function preload ()
// {
//     this.load.html('nameform', 'html/example_form.html');
//     //this.load.image('pic', 'assets/pics/turkey-1985086.jpg');
// }

// function create ()
// {
//     //this.add.image(400, 300, 'pic');

//     var text = this.add.text(10, 10, 'Please login to play', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});

//     var element = this.add.dom(400, 600).createFromCache('nameform');

//     element.setPerspective(800);

//     element.addListener('click');

//     element.on('click', function (event) {

//         if (event.target.name === 'loginButton')
//         {
//             var inputUsername = this.getChildByName('username');
//             var inputPassword = this.getChildByName('password');

//             //  Have they entered anything?
//             if (inputUsername.value !== '' && inputPassword.value !== '')
//             {
//                 //  Turn off the click events
//                 this.removeListener('click');

//                 //  Tween the login form out
//                 this.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 3000, ease: 'Power3' });

//                 this.scene.tweens.add({ targets: element, scaleX: 2, scaleY: 2, y: 700, duration: 3000, ease: 'Power3',
//                     onComplete: function ()
//                     {
//                         element.setVisible(false);
//                     }
//                 });

//                 //  Populate the text with whatever they typed in as the username!
//                 text.setText('Welcome ' + inputUsername.value);

//                 this.scene.scene.transition({target:'SceneMainMenu', duration:500});
//             }
//             else
//             {
//                 //  Flash the prompt
//                 this.scene.tweens.add({ targets: text, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
//             }
//         }

//     });
 
//     this.tweens.add({
//         targets: element,
//         y: 300,
//         duration: 3000,
//         ease: 'Power3'
//     });
// }
