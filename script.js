const get = id => document.getElementById(id);
const word = "JAMES CROSS".split(" ");
let font;
let wordSize;
let textPoints;
let textBounds;
let rndNumbers;

function preload() {
    font = loadFont('https://cdn.glitch.com/ef878d91-bcb8-4e36-b15a-aae29909c3a5%2FTypoWriter.otf?1539710229809');
}

function setup() {
    textPoints = [];
    textBounds = [];
    rndNumbers = [];
    let cnv = createCanvas(window.innerWidth, window.innerHeight);
    cnv.parent("container");
    wordSize = width / 5;
    textAlign(CENTER);
    noStroke();
    textFont(font);
    const args = [word[0], floor(width / 2), floor(height * 0.25), wordSize];
    let jamesPoints = font.textToPoints(...args);
    let jamesBounds = font.textBounds(...args);
    const args2 = [word[1], floor(width / 2), floor(height * 0.75), wordSize];
    let crossPoints = font.textToPoints(...args2);
    let crossBounds = font.textBounds(...args2);
    textPoints.push(jamesPoints, crossPoints);
    textBounds.push(jamesBounds, crossBounds);
    for (let i = 0; i < textPoints[0].length + textPoints[1].length; i++) {
        rndNumbers.push(floor(random(100)));
    }
}

function draw() {
    background(0, 35);
    for (let i = 0; i < textPoints.length; i++) {
        push();
        translate(-textBounds[i].w / 2, +textBounds[i].h / 2);
        for (let j = 0; j < textPoints[i].length; j++) {
            let rndIndex = i * textPoints[0].length + j;
            let rnd = frameCount / 50 + rndNumbers[rndIndex];
            noStroke();
            fill(random(255), random(255), random(255));
            // fill(noise(rnd) * 255, noise(rnd) * 255, noise(rnd) * 255);
            p = textPoints[i][j];
            ellipse(p.x + noise(rnd) * (width / 80), p.y + noise(rnd * 2) * (width / 80), ceil(width / 400) + 2);
            noFill();
            stroke(random(255), random(255), random(255));
            ellipse(p.x + noise(rnd) * (width / 80), p.y + noise(rnd * 2) * (width / 80), ceil(width / 400) + 5 + sin(frameCount / 5 + rndIndex) * 10);
        }
        pop();
    }
}

function windowResized() {
    clear();
    setup();
}
