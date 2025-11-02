// Example JavaScript
console.log("Website loaded successfully!");


class Team {
  constructor(name) {
    this.name = name;
  }

  get_hr() {
    return '10';
  }

}

let team1 = new Team("Nick");

document.getElementById("intro_text").innerHTML = team1.name;

