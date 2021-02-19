class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMainMenu" });
    this.title;
  }

  preload() {
  	this.load.html("nameform", "html/example_form2.html");
 //  	this.load.image("sprBg0", "content/sprBg0.png");
	// this.load.image("sprBg1", "content/sprBg1.png");
	 this.load.image("sprBg2", "content/sprBg2.png");
	// this.load.image("sprBg3", "content/sprBg3.png");
	// this.load.image("sprBg4", "content/sprBg4.png");
	// this.load.image("sprBg5", "content/sprBg5.png");
 //  	this.load.image("sprBtnPlay", "content/sprBtnPlay.png");
	// this.load.image("sprBtnPlayHover", "content/sprBtnPlayHover.png");
	// this.load.image("sprBtnPlayDown", "content/sprBtnPlayDown.png");
	// this.load.image("sprBtnRestart", "content/sprBtnRestart.png");
	// this.load.image("sprBtnRestartHover", "content/sprBtnRestartHover.png");
	// this.load.image("sprBtnRestartDown", "content/sprBtnRestartDown.png");
	// this.load.image("whiteBackground", "content/whiteBackground.png");

	
	// this.load.audio("sndBtnOver", "content/sndBtnOver.wav");
	// this.load.audio("sndBtnDown", "content/sndBtnDown.wav");
  }

  create() {

  	this.add.image(0,0,"sprBg2").setOrigin(0,0);
 //    this.sfx = {
	//   btnOver: this.sound.add("sndBtnOver"),
	//   btnDown: this.sound.add("sndBtnDown")
	// };

	//this.startButton();

		this.title = this.add.text(this.game.config.width * 0.5, 228, "开始游戏", {
		  fontFamily: 'helvetica',
		  fontSize: 48,
		  fontStyle: 'bold',
		  color: 'white',
		  align: 'center'
		});

		this.title.setOrigin(0.5);
		//var text = this.add.text(10, 10, 'Please login to play', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});

	    var element = this.add.dom(this.game.config.width * 0.5, 400).createFromCache('nameform');

	    element.setPerspective(800);

	    element.addListener('click');

	    element.on('click', function (event) {

	        if (event.target.name === 'loginButton')
	        {
	            var inputUsername = this.getChildByName('username');

	            //  Have they entered anything?
	            if (inputUsername.value !== '')
	            {
	                //  Turn off the click events
	                this.removeListener('click');

	                var ret = this.scene.signIn(inputUsername.value);

	                if(ret === true) {
	                	console.log("successful log in for " + inputUsername.value);
	                	this.scene.scene.transition({target:'SceneVisualNovel', duration:500});
	                }

	                //  Populate the text with whatever they typed in as the username!
	                this.scene.title.setText('Welcome ' + inputUsername.value);
	            }
	            else
	            {
	                //  Flash the prompt
	                this.scene.tweens.add({ targets: this.title, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
	            }
	        } else if (event.target.name === "highScoreButton") {
	        	console.log("show high scores");
	        }

	    });

	// this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
	// this.returnKey.on("down", event => {
	// 	console.log("enter pressed");
	// 	let name = this.nameInput.getChildByName("name");
	// 	if(name.value != "") {
	// 		this.title.setText("Hello, " + name.value);
	// 		name.value = "";
	// 	}
	// });
  }


  startButton() {
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
		  //this.scene.start("SceneMain");
		  this.scene.transition({target:'SceneVisualNovel', duration:500});
		}, this);

  }

  signIn(userInput) {
  	var data = { accessCode: userInput, name: "testName" };
  	$.ajax({
  		type: 'POST',
  		url: '/login',
  		data,
  		success: function (data) {
  			console.log("login ajax successful");
  			//this.scene.scene.transition({target:'SceneMain', duration:500});
  			window.location.replace('/index.html');
  			//return true;
  		},
  		error: function (xhr) {
  			window.alert(JSON.stringify(xhr));
  		}
  	});
  }
}