let cWidth;
let cHeight;

let scene;

let numberOfLevels = 18;

let babyImages = [];
let babyBackpackImages = [];
let fireImages = [];
let trampolineImages = [];
let aiTrampolineImages = [];
let firemanImages = [];
let ladyImages = [];
let ParachuteImages = [];
let titleImages = [];
let cloudImages = [];
let helicopterImages = [];

let sounds = {};
let sceneButtonImages = {};

let volumeImages = {};
let volumeButton;

let levels = [];
let status = "menu"; // menu, intro, game, win, lose

let babyStormLevel = 17;
let timeWarpLevel = 18;

function preload() {
    let numberOfBabyImages = 6;
    for (let i = 1; i <= numberOfBabyImages; i += 1) {
        let path = "Assets/BabyImages/baby" + i + ".png";
        babyImages.push(loadImage(path));
    };

    let numberOfBabyBackpackImages = 6;
    for (let i = 1; i <= numberOfBabyBackpackImages; i += 1) {
        let path = "Assets/BabyBackpackImages/babyBackpack" + i + ".png";
        babyBackpackImages.push(loadImage(path));
    };

    let numberOfFireImages = 5;
    for (let i = 1; i <= numberOfFireImages; i += 1) {
        let path = "Assets/FireImages/fire" + i + ".png";
        fireImages.push(loadImage(path));
    };

    let numberOfTrampolineImages = 2;
    for (let i = 1; i <= numberOfTrampolineImages; i += 1) {
        let path = "Assets/TrampolineImages/trampoline" + i + ".png";
        trampolineImages.push(loadImage(path));
    };

    let numberOfAITrampolineImages = 2;
    for (let i = 1; i <= numberOfAITrampolineImages; i += 1) {
        let path = "Assets/AITrampolineImages/aiTrampoline" + i + ".png";
        aiTrampolineImages.push(loadImage(path));
    };

    let numberOfFiremanImages = 1;
    for (let i = 1; i <= numberOfFiremanImages; i += 1) {
        let path = "Assets/FiremanImages/fireman" + i + ".png";
        firemanImages.push(loadImage(path));
    };

    let numberOfLadyImages = 1;
    for (let i = 1; i <= numberOfLadyImages; i += 1) {
        let path = "Assets/LadyImages/lady" + i + ".png";
        ladyImages.push(loadImage(path));
    };

    let numberOfParachuteImages = 1;
    for (let i = 1; i <= numberOfParachuteImages; i += 1) {
        let path = "Assets/ParachuteImages/parachute" + i + ".png";
        ParachuteImages.push(loadImage(path));
    };

    let numberOfTitleImages = 2;
    for (let i = 1; i <= numberOfTitleImages; i += 1) {
        let path = "Assets/TitleImages/titleImages" + i + ".png";
        titleImages.push(loadImage(path));
    }

    let numberOfCloudImages = 1;
    for (let i = 1; i <= numberOfCloudImages; i += 1) {
        let path = "Assets/CloudImages/cloud" + i + ".png";
        cloudImages.push(loadImage(path));
    }

    let numberOfHelicopterImages = 2;
    for (let i = 1; i <= numberOfHelicopterImages; i += 1) {
        let path = "Assets/HelicopterImages/helicopter" + i + ".png";
        helicopterImages.push(loadImage(path));
    }

    sounds = {
        "backgroundMusic": loadSound("Sounds/backgroundMusic.mp3"),
        "boing": loadSound("Sounds/boing.mp3"),
        "break": loadSound("Sounds/break.wav"),
        "dropped": loadSound("Sounds/dropped.wav"),
        "coda": loadSound("Sounds/coda.mp3"),
        "homeMusic": loadSound("Sounds/homeMusic.mp3", initialScene),
        "highPitchedBackgroundMusic": loadSound("Sounds/highPitchedBackgroundMusic.mp3"),
        "highPitchedBoing": loadSound("Sounds/highPitchedBoing.wav"),
        "highPitchedCoda": loadSound("Sounds/highPitchedCoda.mp3"),
        "highPitchedDropped": loadSound("Sounds/highPitchedDropped.wav"),
        "babyStormBackgroundMusic": loadSound("Sounds/babyStormBackgroundMusic.mp3")
    };

    sceneButtonImages = {
        "play": loadImage("Assets/SceneButtonImages/play.png"),
        "homeIcon": loadImage("Assets/SceneButtonImages/homeIcon.png"),
        "nextLevel": loadImage("Assets/SceneButtonImages/nextLevel.png"),
        "levels": loadImage("Assets/SceneButtonImages/levels.png"),
        "home": loadImage("Assets/SceneButtonImages/home.png"),
        "tryAgain": loadImage("Assets/SceneButtonImages/tryAgain.png"),
        "levelsIcon": loadImage("Assets/SceneButtonImages/levelsIcon.png"),
        "stats": loadImage("Assets/SceneButtonImages/stats.png")
    };

    volumeImages = {
        "on": loadImage("Assets/VolumeImages/soundOn.png"),
        "off": loadImage("Assets/VolumeImages/soundOff.png"),
    };


}

function initialScene() {

    for (let key in sounds) {
        sounds[key].setVolume(0.25);
    }

    setScene(new Home());
    sounds["homeMusic"].loop();
}

function setup() {

    setInitialStats();

    let maxWidth = windowWidth * 0.95;
    let maxHeight = windowHeight * 0.95;

    if (maxWidth > maxHeight) {
        cHeight = maxHeight;
        cWidth = 4/3*cHeight;
    } else {
        cWidth = maxWidth;
        cHeight = 3/4*cWidth;
    }

    createCanvas(cWidth, cHeight);

    for (let i = 1; i <= numberOfLevels; i += 1) {
        let level = new Level(i);
        level.init();
        levels.push(level);
    }

    volumeButton = {
        "x": cWidth - 50,
        "y": 10,
        "width": 40,
        "height": 40,
        "image": volumeImages["on"],
        show: function() {
            image(this.image, this.x, this.y, this.width, this.height);
        },
        inBounds: function(x, y) {
            if (this.x < x && this.x + this.width > x) {
                if (this.y < y && this.y + this.height > y) {
                    return true;
                }
            }
            return false;
        }
    }
}

function setScene(_scene) {

    let currentScene = scene;
    scene = _scene;
    scene.init();

    if (currentScene instanceof Level || scene instanceof Level) {


        if (currentScene instanceof Level) {
            if (currentScene.n == timeWarpLevel) {
                for (let key in currentScene.sounds) {
                    currentScene.sounds[key].reverseBuffer();
                }
            }
        }
        for (let key in sounds) {
            sounds[key].stop();
        }

        if (scene instanceof Level) {
            if (scene.n == timeWarpLevel) {
                for (let key in scene.sounds) {
                    scene.sounds[key].reverseBuffer();
                }
            }
            scene.sounds["backgroundMusic"].play();
        } else if (scene instanceof LevelMenu) {
            sounds["homeMusic"].loop();
        } else if (scene instanceof Home) {
            sounds["homeMusic"].loop();
        }
    }

    if (scene instanceof Level) {
        scene.startIntro(3);
    } else if (scene instanceof LevelMenu) {
        if (currentScene instanceof Level) {
            scene.selectButton(scene.levelButtons[currentScene.n - 1]);
        }
    }
}

function draw() {
    if (scene) {
        background(scene.backgroundColor);
        scene.show();
        volumeButton.show();
    }
}

function keyPressed() {
    if (scene instanceof LevelMenu) {
        if (keyCode == RIGHT_ARROW) {
            if (levels.indexOf(scene.selected.level) < levels.length - 1) {
                let nextButton = scene.levelButtons[scene.levelButtons.indexOf(scene.selected) + 1];
                scene.selectButton(nextButton);
            }
        } else if (keyCode == LEFT_ARROW) {
            if (levels.indexOf(scene.selected.level) > 0) {
                let nextButton = scene.levelButtons[scene.levelButtons.indexOf(scene.selected) - 1];
                scene.selectButton(nextButton);
            }
        } else if (keyCode == ENTER) {
            setScene(scene.goToGameButton.sceneTo);
        }
    }
}

function mouseMoved() {
    if (scene instanceof LevelMenu) {
        if (scene.goToGameButton) {
            if (scene.goToGameButton.inBounds(mouseX, mouseY)) {
                scene.goToGameButton.isHighlighted = true;
            } else {
                scene.goToGameButton.isHighlighted = false;
            }
        }
    } else if (scene instanceof Level) {
        for (let button of scene.sceneButtons) {
            if (button.inBounds(mouseX, mouseY)) {
                button.isHighlighted = true;
            } else {
                button.isHighlighted = false;
            }
        }
    } else if (scene instanceof Home) {
        if (scene.levelSelectButton) {
            if (scene.levelSelectButton.inBounds(mouseX, mouseY)) {
                scene.levelSelectButton.isHighlighted = true;
            } else {
                scene.levelSelectButton.isHighlighted = false
            }
        }
        if (scene.statsButton) {
            if (scene.statsButton.inBounds(mouseX, mouseY)) {
                scene.statsButton.isHighlighted = true;
            } else {
                scene.statsButton.isHighlighted = false
            }
        }
        if (scene.creditsSceneButton) {
            if (scene.creditsSceneButton.inBounds(mouseX, mouseY)) {
                scene.creditsSceneButton.fill = [0, 255, 0];
            } else {
                scene.creditsSceneButton.fill = "white";
            }
        }
    } else if (scene instanceof Credits) {
        if (scene.homeSceneButton) {
            if (scene.homeSceneButton.inBounds(mouseX, mouseY)) {
                scene.homeSceneButton.isHighlighted = true;
            } else {
                scene.homeSceneButton.isHighlighted = false;
            }
        }
    } else if (scene instanceof Stats) {
        if (scene.homeSceneButton) {
            if (scene.homeSceneButton.inBounds(mouseX, mouseY)) {
                scene.homeSceneButton.isHighlighted = true;
            } else {
                scene.homeSceneButton.isHighlighted = false;
            }
        }
    }
    
}

function mousePressed() {
    if (scene) {
        if (volumeButton.inBounds(mouseX, mouseY)) {
            if (volumeButton.image === volumeImages["on"]) {
                volumeButton.image = volumeImages["off"];
                for (let key in sounds) {
                    sounds[key].setVolume(0);
                }
            } else {
                volumeButton.image = volumeImages["on"];
                for (let key in sounds) {
                    sounds[key].setVolume(0.25);
                }
            }
        }
    }
    if (scene instanceof LevelMenu) {
        for (let levelButton of scene.levelButtons) {
            if (levelButton.inBounds(mouseX, mouseY)) {
                scene.selectButton(levelButton);
                break;
            }
        }
        if (scene.goToGameButton && scene.goToGameButton.inBounds(mouseX, mouseY)) {
            setScene(scene.goToGameButton.sceneTo);
        } else if (scene.goToHomeSceneButton && scene.goToHomeSceneButton.inBounds(mouseX, mouseY)) {
            setScene(scene.goToHomeSceneButton.sceneTo);
        }
    } else if (scene instanceof Level) {
        for (let button of scene.sceneButtons) {
            if (button.inBounds(mouseX, mouseY)) {
                setScene(button.sceneTo);
                break;
            }
        }
    } else if (scene instanceof Home) {
        if (scene.levelSelectButton && scene.levelSelectButton.inBounds(mouseX, mouseY)) {
            setScene(scene.levelSelectButton.sceneTo);
        } else if (scene.statsButton && scene.statsButton.inBounds(mouseX, mouseY)) {
            setScene(scene.statsButton.sceneTo);
        } else if (scene.creditsSceneButton && scene.creditsSceneButton.inBounds(mouseX, mouseY)) {
            setScene(new Credits());
        }
    } else if (scene instanceof Credits) {
        if (scene.homeSceneButton && scene.homeSceneButton.inBounds(mouseX, mouseY)) {
            setScene(scene.homeSceneButton.sceneTo);
        }
    } else if (scene instanceof Stats) {
        if (scene.homeSceneButton && scene.homeSceneButton.inBounds(mouseX, mouseY)) {
            setScene(scene.homeSceneButton.sceneTo);
        }
    }
}

function setInitialStats() {
    let str;

    // Total Babies Caught
    str = "Total Babies Caught";
    if (!(str in localStorage)) {
        localStorage.setItem(str, 0);
    }

    // Total Babies Dropped
    str = "Total Babies Dropped";
    if (!(str in localStorage)) {
        localStorage.setItem(str, 0);
    }

    // Average Percentage
    str = "Average Percentage";
    if (!(str in localStorage)) {
        localStorage.setItem(str, 0);
    }

    // Games Played
    str = "Games Played";
    if (!(str in localStorage)) {
        localStorage.setItem(str, 0);
    }

    // Total Time Played
    str = "Total Time Played";
    if (!(str in localStorage)) {
        localStorage.setItem(str, 0);
    }

    // Trampolines Broken
    str = "Trampolines Broken";
    if (!(str in localStorage)) {
        localStorage.setItem(str, 0);
    }
}

// $(document).bind("contextmenu",function(e) {
//     e.preventDefault();
// });

// $(document).keydown(function(e){
//     if(e.which === 123){
//        return false;
//     }
// });