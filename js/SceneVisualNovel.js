class SceneVisualNovel extends Phaser.Scene {
  constructor() {
    super({ key: "SceneVisualNovel" });
    this.wholeBody;
    // this.junMad;
    // this.junMadCloseEyes;
    // this.junOpenMouth;
    // this.junOpenMouthCloseEyes;

    this.background;

    this.dialogText;
    this.nameText;
    this.counter = 0;
    this.storyArray;
    this.storyProgress = 0;

    this.btnChoice;
    this.btnChoice2;
    this.choiceBoxText;
    this.choiceBox2Text;

  }

  preload() {
    this.load.image("wholeBody", "content/wholeBody.png");
    this.load.image("junMad", "content/mad.png");
    this.load.image("junMadCloseEyes", "content/madCloseEyes.png");
    this.load.image("junOpenMouth", "content/openMouth.png");
    this.load.image("junOpenMouthCloseEyes", "content/openMouthCloseEyes.png");

    this.load.image("background", "content/background.png");
    this.load.image("textBox", "content/textBox.png");
    this.load.image("choiceBox", "content/choiceBox.png");
    this.load.image("choiceBoxPressed", "content/choiceBoxPressed.png");

    this.load.scenePlugin({
      key: "DialogModelPlugin",
      url: 'js/dialog_plugin.js',
      sceneKey: "dialogModel"
    });

    this.load.text("story", "story/story.txt");
  }

  create() {
    this.wholeBody = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height/2 + 20,"junMad").setAlpha(0);
    // let scaleX = this.cameras.main.width / this.wholeBody.width;
    // let scaleY = this.cameras.main.height / this.wholeBody.height;
    // let scale = Math.max(scaleX, scaleY);
    //this.wholeBody.setScale(0.95).setScrollFactor(0);
    this.wholeBody.setDepth(2);
    //this.wholeBody.setTexture("junMadCloseEyes");

    this.background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2,"background");
    let scaleX = this.cameras.main.width / this.background.width;
    let scaleY = this.cameras.main.height / this.background.height;
    let scale = Math.max(scaleX, scaleY);
    this.background.setScale(scale).setScrollFactor(0);
    this.background.setDepth(1);

    const textBox = this.add.image(this.cameras.main.width / 2, this.cameras.main.height - 150 , "textBox").setAlpha(0.85);
    textBox.setDepth(3);

    //const choiceBox = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 4, "choiceBox").setAlpha(0.85);
    //const choiceBox2 = this.add.image(this.cameras.main.width / 2, 2 *this.cameras.main.height / 5, "choiceBox").setAlpha(0.85);
    //choiceBox.setDepth(3);
    //choiceBox2.setDepth(3);

    // set up choice buttons 
    this.setupChoiceBoxes();

    this.tweens.add({
      targets: this.wholeBody,
      duration: 2500,
      alpha: 1
    });

    this.dialogText = this.add.text(35, this.cameras.main.height - textBox.height + 70, "测试测试测试测试", {
      fontFamily: 'fondolHei', 
      fontSize: 25,
      padding: {left: 30, buttom: 10},
      color: '#ffffff'
    })
    this.dialogText.setDepth(5);

    this.nameText = this.add.text(35, this.cameras.main.height - textBox.height + 22, "测试", {
      fontFamily: 'fondolHei', 
      fontSize: 25,
      padding: {left: 30, buttom: 10},
      color: '#ffffff'
    })
    this.nameText.setDepth(5);

    var message1 = "测试测试测试测试";

    this.displayLetterByLetterText(this.dialogText, message1, message1.length);

    // try{
    //   let story = fs.readFileSync('story/story.yaml', 'utf8');
    //   let data = yaml.safeLoad(story);
    //   console.log(data);
    // } catch(e) {
    //   console.log(e);
    // }

    let story = this.cache.text.get("story");
    console.log(story);
    this.storyArray = story.split('\n');

    this.input.on('pointerdown', this.moveToNextLine, this);

  }

  
  update() {

    // check for clicking
    // if yes, read the next line
  }

  setupChoiceBoxes() {
    this.btnChoice = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 4, "choiceBox").setAlpha(0).setDepth(3);
    this.btnChoice.setInteractive();
    this.btnChoice.on("pointerover", function() {
      this.btnChoice.setTexture("choiceBoxPressed");
    }, this);
    this.btnChoice.on("pointerout", function() {
      this.btnChoice.setTexture("choiceBox");
    }, this);
    this.btnChoice.on("pointerdown", function() {
      this.btnChoice.setTexture("choiceBoxPressed");
    }, this);
    this.btnChoice.on("pointerup", function() {
      this.btnChoice.setAlpha(0);
      this.btnChoice2.setAlpha(0);
    }, this);

    this.btnChoice2 = this.add.sprite(this.cameras.main.width / 2, 2* this.cameras.main.height / 5, "choiceBox").setAlpha(0).setDepth(3);
    this.btnChoice2.setInteractive();
    this.btnChoice2.on("pointerover", function() {
      this.btnChoice2.setTexture("choiceBoxPressed");
    }, this);
    this.btnChoice2.on("pointerout", function() {
      this.btnChoice2.setTexture("choiceBox");
    }, this);
    this.btnChoice2.on("pointerdown", function() {
      this.btnChoice2.setTexture("choiceBoxPressed");
    }, this);
    this.btnChoice2.on("pointerup", function() {
      this.btnChoice.setAlpha(0);
      this.btnChoice2.setAlpha(0);
    }, this);


    this.boxChoiceText = this.add.text(100, (this.cameras.main.height / 4) - 12, "", {
      fontFamily: 'fondolHei', 
      fontSize: 25,
      padding: {left: 30, buttom: 10},
      color: '#ffffff'
    })
    this.boxChoiceText.setDepth(5);

    this.boxChoice2Text = this.add.text(100, (2* this.cameras.main.height / 5) - 12, "", {
      fontFamily: 'fondolHei', 
      fontSize: 25,
      padding: {left: 30, buttom: 10},
      color: '#ffffff'
    })
    this.boxChoice2Text.setDepth(5);
  }

  displayNextLetter() {

    this.textObject.text = this.message.substr(0, this.counter);
    this.counter += 1;

  }

  // displayLetterByLetterText(textObject, message, onCompleteCallback) {

  //     var timerEvent = game.time.events.repeat(80, message.length, displayNextLetter, 
  //                                 { textObject: textObject, message: message, counter: 1 });

  //     timerEvent.timer.onComplete.addOnce(onCompleteCallback, this);

  // }

  displayLetterByLetterText(textObject, message, len) {

      var timer = this.time.addEvent({
        delay: 100,
        callback: function() {
          textObject.text = message.substr(0, this.counter);
          if(this.counter == len) {
            this.counter = 0;
          } else {
            this.counter += 1;
          }
        },
        callbackScope: this, 
        repeat: len
      })
  }

  moveToNextLine() {
    var line = this.storyArray[this.storyProgress];
    var subjectLine = line.split(":");
    console.log("subject line: " + subjectLine);

    //contains subject title and description
    var subject = subjectLine[0].split(" ");
    console.log("subject: " + subject);
    var message = "skip message " + this.storyProgress;

    switch(subject[0]) {
      case "???":
        message = subjectLine[1];
        break;
      case "jun":
        message = subjectLine[1];
        break;
      case "choice":
        if(subject[1] === "single") {
          //display one choice box
          this.btnChoice.setAlpha(0.85);
          message = subjectLine[1];
          this.boxChoiceText.text = message;


        } else if(subject[1] === "double") {
          //display two choice boxes
        }
        break;
      case "show":
        if(subject[1] === "jun") {
          //show jun, depending on expression
        } else if(subject[1] === "background") {
          //show shop
        }
        break;
      default:
        console.log("error decoding [subject] from story.txt");
    }

    this.storyProgress++;

    //var message2 = "......";
    console.log(message);
    this.displayLetterByLetterText(this.dialogText, message, message.length);
  }

  splitMessage(str) {
    // split the message into array of strings if the given str has more than 13 caracters

  }
}