class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMainMenu" });
  }

  preload() {
  	this.load.image("sprBg0", "content/sprBg0.png");
	this.load.image("sprBg1", "content/sprBg1.png");
	this.load.image("sprBg2", "content/sprBg2.png");
	this.load.image("sprBg3", "content/sprBg3.png");
	this.load.image("sprBg4", "content/sprBg4.png");
	this.load.image("sprBg5", "content/sprBg5.png");
  	this.load.image("sprBtnPlay", "content/sprBtnPlay.png");
	this.load.image("sprBtnPlayHover", "content/sprBtnPlayHover.png");
	this.load.image("sprBtnPlayDown", "content/sprBtnPlayDown.png");
	this.load.image("sprBtnRestart", "content/sprBtnRestart.png");
	this.load.image("sprBtnRestartHover", "content/sprBtnRestartHover.png");
	this.load.image("sprBtnRestartDown", "content/sprBtnRestartDown.png");

	// this.load.audio("sndBtnOver", "content/sndBtnOver.wav");
	// this.load.audio("sndBtnDown", "content/sndBtnDown.wav");
  }

  create() {

  	this.add.image(0,0,"sprBg2").setOrigin(0,0);
 //    this.sfx = {
	//   btnOver: this.sound.add("sndBtnOver"),
	//   btnDown: this.sound.add("sndBtnDown")
	// };

	this.btnPlay = this.add.sprite(
	  this.game.config.width * 0.5,
	  this.game.config.height * 0.5,
	  "sprBtnPlay"
	);

	this.btnPlay.setInteractive();

	this.btnPlay.on("pointerover", function() {
	  this.btnPlay.setTexture("sprBtnPlayHover"); // set the button texture to sprBtnPlayHover
	  // this.sfx.btnOver.play(); // play the button over sound
	}, this);

	this.btnPlay.on("pointerout", function() {
	  this.setTexture("sprBtnPlay");
	});

	this.btnPlay.on("pointerdown", function() {
	  this.btnPlay.setTexture("sprBtnPlayDown");
	  // this.sfx.btnDown.play();
	}, this);

	this.btnPlay.on("pointerup", function() {
	  this.btnPlay.setTexture("sprBtnPlay");
	  this.scene.start("SceneMain");
	}, this);

	this.title = this.add.text(this.game.config.width * 0.5, 128, "开始游戏", {
	  fontFamily: 'monospace',
	  fontSize: 48,
	  fontStyle: 'bold',
	  color: '#ffffff',
	  align: 'center'
	});

	this.title.setOrigin(0.5);

	// this.backgrounds = [];
	// for (var i = 0; i < 3; i++) {
	//   var keys = ["sprBg4", "sprBg1"];
	//   var key = keys[Phaser.Math.Between(0, keys.length - 1)];
	//   var bg = new ScrollingBackground(this, key, i * 8);
	//   this.backgrounds.push(bg);
	// }
  }

 //  update() {
 //  	for (var i = 0; i < this.backgrounds.length; i++) {
	//   this.backgrounds[i].update();
	// }
 //  }
}