const randomJokesURL = "https://official-joke-api.appspot.com/random_joke";
const localJokesURL = "http://localhost:3000/jokes";
const jokeForm = document.querySelector("#joke-form");

// Collecting joke data from jokeForm
jokeForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const type = document.getElementById("jokeType").value;
  const setup = document.getElementById("setup").value;
  const punchline = document.getElementById("punchline").value;

  const jokeDetails = {
    type: type,
    setup: setup,
    punchline: punchline,
  };
  
  jokePoster(jokeDetails);
  jokeForm.reset()
});

// Joke poster
function jokePoster(jokeDetails) {
  fetch(localJokesURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jokeDetails),
  })
    .then((res) => res.json())
    .then((joke) => {
    renderLocalJokes(joke)
    });
}

// Fetching random joke
function fetchRandomJoke() {
  fetch(randomJokesURL)
    .then((res) => res.json())
    .then((jokes) => {
      renderJokes(jokes);
    });
}

fetchRandomJoke();

function renderJokes(joke) {
  const jokesDiv = document.querySelector(".random");

  const type = document.createElement("h4");
  const setup = document.createElement("p");
  const punchline = document.createElement("p");
  const showPunchline = document.createElement("button");
  const nextJoke = document.createElement("button");

  punchline.className = "hide";

  showPunchline.addEventListener("click", () => {
    if (punchline.className === "hide") {
      punchline.className = "show";
      showPunchline.textContent = "Hide Punchline";
    } else {
      punchline.className = "hide";
      showPunchline.textContent = "Show Punchline";
    }
  });

  nextJoke.addEventListener("click", () => {
    jokesDiv.innerHTML = "";
    fetchRandomJoke();
  });

  showPunchline.textContent = "Show Punchline";
  nextJoke.textContent = "Next";

  type.textContent = joke.type;
  setup.textContent = joke.setup;
  punchline.textContent = joke.punchline;

  jokesDiv.append(type, setup, showPunchline, punchline, nextJoke);
}

function fetchLocalJoke() {
  fetch(localJokesURL)
    .then((res) => res.json())
    .then((mzaha) => {
      mzaha.map(renderLocalJokes);

      // mzaha.map((jk) => {
      //     renderLocalJokes(jk)
      // })
    });
}

fetchLocalJoke(); //Invocation

function renderLocalJokes(mzaha) {
  const localJokesDiv = document.querySelector(".local");
  const jokeDiv = document.createElement("div");
  const type = document.createElement("h4");
  const setup = document.createElement("p");
  const punchline = document.createElement("p");
  const showPunchline = document.createElement("button");
  const deleteBtn = document.createElement("button");

  punchline.className = "hide";
  jokeDiv.className = "joke-div";
  jokeDiv.id = mzaha.id;

  showPunchline.textContent = "Show Punchline";

  showPunchline.addEventListener("click", () => {
    if (punchline.className === "hide") {
      punchline.className = "show";
      showPunchline.textContent = "Hide Punchline";
    } else {
      punchline.className = "hide";
      showPunchline.textContent = "Show Punchline";
    }
  });

  let jokeId;
  type.textContent = mzaha.type;
  setup.textContent = mzaha.setup;
  punchline.textContent = mzaha.punchline;
  jokeId = mzaha.id;
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", function () {
    deleteLocalJokes(jokeId);
  });
  jokeDiv.append(type, setup, showPunchline, punchline, deleteBtn);
  localJokesDiv.append(jokeDiv);
}

// Editing joke
function editJokes(jokeId) {
  fetch(`http://localhost:3000/jokes/${jokeId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Deleting local jokes
function deleteLocalJokes(jokeId) {
  const idDelete = document.getElementById(jokeId);
  fetch(`http://localhost:3000/jokes/${jokeId}`, {
    method: "DELETE",
    // headers: {
    //   "content-Type": "application/json",
    // },
  })
  .then(res => res.json())
  .then(() => {
      idDelete.remove(jokeId)
  })
}
