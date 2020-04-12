import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-welcome',
  template:`<div class="page-container">
    <img src="../../../assets/Hero-Image.png" alt="">
    <div class="hero">
      <div>
        <router-outlet></router-outlet>
      </div>
    </div>
    <div class="footer">

    </div>
  </div>`,
  styles: [".page-container{\n" +
  "  width: 100vw;\n" +
  "  height: 100vh;\n" +
  "  position: relative;\n" +
  "  background-image: linear-gradient(to right , #cccdebe5, #e1e2fe );\n" +
  "}\n" +
  "\n" +
  ".hero{\n" +
  "  width: 100%;\n" +
  "  height: 100vh;\n" +
  "  display: flex;\n" +
  "  align-items: center;\n" +
  "  justify-content: flex-start;\n" +
  "}\n" +
  "\n" +
  ".hero > div{\n" +
  "  padding: 0.5rem;\n" +
  "  padding-left: 2rem;\n" +
  "  min-height: 50%;\n" +
  "  width: 50%;\n" +
  "  display: flex;\n" +
  "  position: relative;\n" +
  "}\n" +
  "\n" +
  ".page-container img{\n" +
  "  width: 100vw;\n" +
  "  height: 100vh;\n" +
  "  position: absolute;\n" +
  "  top: 0;\n" +
  "  left: 0;\n" +
  "  image-rendering: optimizeSpeed;\n" +
  "}"]
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


}
