class PreloadScene extends Phaser.Scene {
	constructor() {
		super('preload');
	}

	preload() {
		this.load.html("form", "html/example_form.html");
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
		this.load.image("whiteBackground", "content/whiteBackground.png");
	}

	create() {
		var nameInput = this.add.dom(200, 400).createFromCache("form");
		nameInput.addListener('click');
		nameInput.on('click', function (event) {
			if (event.target.name === 'loginButton')
	        {
	            var inputUsername = this.getChildByName('username');
	            //var inputPassword = this.getChildByName('password');
	            console.log(inputUsername);

	            //  Have they entered anything?
	            if (inputUsername.value !== '') // && inputPassword.value !== '')
	            {
	                //  Turn off the click events
	                //this.removeListener('click');

	                //  Tween the login form out
	                //this.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 3000, ease: 'Power3' });

	                // this.scene.tweens.add({ targets: element, scaleX: 2, scaleY: 2, y: 700, duration: 3000, ease: 'Power3',
	                //     onComplete: function ()
	                //     {
	                //         element.setVisible(false);
	                //     }
	                // });

	                //  Populate the text with whatever they typed in as the username!
	                //this.title.setText('Welcome ' + inputUsername.value);
	            }
	            else
	            {
	            	console.log("no input");
	                //  Flash the prompt
	                //this.scene.tweens.add({ targets: text, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
	            }
	        }

		});
	}
}