import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

export const CatAnimation = () => {
  const canvasRef = useRef(null);
  const p5Instance = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      let cat;
      let toys = [];
      let particles = [];
      
      const CAT_FRAMES = {
        walk: [
          ["  /\\_/\\", " ( o.o )", " > ^ < "],
          ["  /\\_/\\", " ( o.o )", "  > ^ <"]
        ],
        sit: [
          ["  /\\_/\\", " ( ◕ᴥ◕ )", " (u   u)", "  || ||"]
        ],
        sleep: [
          ["  /\\_/\\", " ( -.- ) zZ", " (u   u)", "  || ||"]
        ],
        pounce: [
          ["  /\\_/\\", " ( >0< )", "  >> <<"]
        ],
        heart: [
          ["  /\\_/\\", " ( ◕‿◕ )♥", " (u   u)"]
        ]
      };

      class Toy {
        constructor(x, y) {
          this.x = x;
          this.y = y;
          this.v = p.createVector(p.random(-2, 2), p.random(-2, 2));
          this.char = p.random(['*', 'o', '+', '@']);
          this.life = 300;
        }
        update() {
          this.x += this.v.x;
          this.y += this.v.y;
          this.v.y += 0.05; // gravity
          if (this.y > p.height - 25) {
            this.y = p.height - 25;
            this.v.y *= -0.6;
          }
          if (this.x < 0 || this.x > p.width) this.v.x *= -1;
          this.life--;
        }
        display() {
          p.text(this.char, this.x, this.y);
        }
      }

      class ASCIICat {
        constructor() {
          this.pos = p.createVector(p.width / 2, p.height - 50);
          this.target = p.createVector(this.pos.x, this.pos.y);
          this.state = 'idle'; // idle, walk, hunt, sleep, sit
          this.frame = 0;
          this.facingRight = true;
          this.timer = 0;
          this.speed = 2;
          this.emoji = "";
          this.emojiTimer = 0;
        }

        update() {
          const mPos = p.createVector(p.mouseX, p.mouseY);
          const distToMouse = p.dist(mPos.x, mPos.y, this.pos.x, this.pos.y);
          
          // State Machine logic
          if (this.state === 'idle') {
            if (distToMouse < 150) {
              this.state = 'walk';
              this.target = mPos;
            } else if (p.random(1) < 0.01) {
              this.state = 'walk';
              this.target = p.createVector(p.random(50, p.width-100), p.height - 50);
            }
          } else if (this.state === 'walk') {
            const dir = p5.Vector.sub(this.target, this.pos);
            if (dir.mag() < 10) {
              this.state = p.random(1) < 0.3 ? 'sit' : 'idle';
              this.timer = p.random(60, 120);
            } else {
              dir.normalize();
              this.pos.add(dir.mult(this.speed));
              this.facingRight = dir.x > 0;
              if (p.frameCount % 8 === 0) this.frame = (this.frame + 1) % 2;
            }
            if (distToMouse < 80) this.state = 'hunt';
          } else if (this.state === 'hunt') {
            const dir = p5.Vector.sub(mPos, this.pos);
            if (dir.mag() > 200) {
              this.state = 'idle';
            } else {
              this.target = mPos;
              dir.normalize();
              this.pos.add(dir.mult(3.5)); // Faster
              this.facingRight = dir.x > 0;
              if (p.frameCount % 5 === 0) this.frame = (this.frame + 1) % 2;
            }
          } else if (this.state === 'sit' || this.state === 'sleep') {
            this.timer--;
            if (this.timer <= 0 || distToMouse < 100) this.state = 'idle';
          }

          if (this.emojiTimer > 0) this.emojiTimer--;
          
          // Keep in bounds
          this.pos.x = p.constrain(this.pos.x, 0, p.width - 100);
          this.pos.y = p.constrain(this.pos.y, 10, p.height - 40);
        }

        display() {
          const isDark = document.documentElement.classList.contains('dark');
          p.fill(isDark ? 255 : 0);
          p.textFont('monospace');
          p.textSize(12);
          
          let frames = CAT_FRAMES.walk;
          if (this.state === 'sit') frames = CAT_FRAMES.sit;
          if (this.state === 'sleep') frames = CAT_FRAMES.sleep;
          if (this.state === 'hunt') frames = CAT_FRAMES.pounce;
          if (this.emojiTimer > 30 && this.state === 'sit') frames = CAT_FRAMES.heart;

          p.push();
          p.translate(this.pos.x, this.pos.y);
          if (!this.facingRight && (this.state === 'walk' || this.state === 'hunt')) {
            p.scale(-1, 1);
            p.translate(-80, 0);
          }

          const current = frames[this.frame % frames.length];
          current.forEach((line, i) => {
            p.text(line, 0, i * 14);
          });
          p.pop();

          if (this.emojiTimer > 0 && this.state !== 'sit') {
            p.textSize(10);
            p.text(this.emoji, this.pos.x + 40, this.pos.y - 10);
          }
        }

        say(text) {
          this.emoji = text;
          this.emojiTimer = 90;
        }
      }

      p.setup = () => {
        const canvas = p.createCanvas(canvasRef.current.offsetWidth, 200);
        canvas.parent(canvasRef.current);
        cat = new ASCIICat();
      };

      p.draw = () => {
        const isDark = document.documentElement.classList.contains('dark');
        p.background(isDark ? 0 : 255);
        
        const color = isDark ? 40 : 220;
        const textColor = isDark ? 60 : 190;
        p.fill(textColor);
        p.noStroke();
        p.textFont('monospace');
        p.textSize(10);

        // Background elements (Simplified for mobile)
        const doorX = p.width * (p.width < 400 ? 0.6 : 0.75);
        const doorY = p.height - 110;
        p.text(" _________ ", doorX, doorY);
        p.text("|         |", doorX, doorY + 12);
        p.text("|      O  |", doorX, doorY + 36);
        p.text("|_________|", doorX, doorY + 84);

        // Draw Potted Plant 1 (Small)
        const p1X = p.width * 0.08;
        const p1Y = p.height - 75;
        p.text("  _w_  ", p1X, p1Y);
        p.text(" [___] ", p1X, p1Y + 36);

        // Draw mouse hole
        const holeX = p.width * 0.45;
        const holeY = p.height - 50;
        p.text("  _---_  ", holeX, holeY + 15);
        p.text(" (     ) ", holeX, holeY + 27);

        // Draw floor
        p.stroke(color);
        p.strokeWeight(1);
        p.line(0, p.height - 20, p.width, p.height - 20);

        cat.update();
        cat.display();

        for (let i = toys.length - 1; i >= 0; i--) {
          toys[i].update();
          toys[i].display();
          if (toys[i].life <= 0) toys.splice(i, 1);
        }
      };

      p.mousePressed = () => {
        if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
          toys.push(new Toy(p.mouseX, p.mouseY));
          if (p.random() < 0.3) cat.say(p.random(["meow!", "purrr", "^_^", "murP?"]));
        }
      };

      p.windowResized = () => {
        if (canvasRef.current) {
          p.resizeCanvas(canvasRef.current.offsetWidth, 200);
        }
      };
    };

    p5Instance.current = new p5(sketch);

    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
      }
    };
  }, []);

  return (
    <div 
      ref={canvasRef} 
      className="w-full h-[200px] border border-border/20 rounded-lg bg-white dark:bg-black overflow-hidden shadow-sm transition-colors duration-300"
      style={{ cursor: 'crosshair' }}
    />
  );
};
