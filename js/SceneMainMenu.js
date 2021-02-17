class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMainMenu" });
  }

  preload() {
  	this.load.html("nameform", "html/example_form.html");
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
		  fontFamily: 'monospace',
		  fontSize: 48,
		  fontStyle: 'bold',
		  color: 'white',
		  align: 'center'
		});

		this.title.setOrigin(0.5);
		var text = this.add.text(10, 10, 'Please login to play', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});

	    var element = this.add.dom(200, 200).createFromCache('nameform');

	    //element.setPerspective(800);

	    element.addListener('click');

	    element.on('click', function (event) {

	        if (event.target.name === 'loginButton')
	        {
	            var inputUsername = this.getChildByName('username');
	            var inputPassword = this.getChildByName('password');

	            //  Have they entered anything?
	            if (inputUsername.value !== '' && inputPassword.value !== '')
	            {
	                //  Turn off the click events
	                this.removeListener('click');

	                //  Tween the login form out
	                this.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 3000, ease: 'Power3' });

	                this.scene.tweens.add({ targets: element, scaleX: 2, scaleY: 2, y: 700, duration: 3000, ease: 'Power3',
	                    onComplete: function ()
	                    {
	                        element.setVisible(false);
	                    }
	                });

	                //  Populate the text with whatever they typed in as the username!
	                text.setText('Welcome ' + inputUsername.value);
	            }
	            else
	            {
	                //  Flash the prompt
	                this.scene.tweens.add({ targets: text, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
	            }
	        }

	    });
	 
	    // this.tweens.add({
	    //     targets: element,
	    //     y: 300,
	    //     duration: 3000,
	    //     ease: 'Power3'
	    // });
	

	this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
	this.returnKey.on("down", event => {
		console.log("enter pressed");
		let name = this.nameInput.getChildByName("name");
		if(name.value != "") {
			this.title.setText("Hello, " + name.value);
			name.value = "";
		}
	});


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

  signIn() {
  	var accessCode = userInput;
  	$.ajax({
  		type: 'POST',
  		url: '/login',
  		accessCode,
  		success: function (data) {
  			console.log("log in successful from game");
  		},
  		error: function (xhr) {
  			window.alert(JSON.stringify(xhr));
  		}
  	});
  }
}