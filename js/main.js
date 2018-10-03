window.onload = function() {
  getCategories();
}

var getCategories = () => {
  fetch('https://api.chucknorris.io/jokes/categories')
  .then((response) => {
    // console.log(response);
    return response.json();
  })
  .then((json) => {
    setCategories(json);
  });
}

var setCategories = (categories) => {
  getContent(categories[0]);
  let select = document.getElementsByName('random-search')[0];
  categories.forEach((category) => {
    let newOption = document.createElement('option');
        newOption.value = category;
        newOption.text  = category;
    select.appendChild(newOption);
  });
}

var getSelectedOption = (e) => {
  e.preventDefault();
  let select = document.getElementsByName('random-search')[0];
  let category = select.options[ select.selectedIndex ].value;
  getContent(category);
}


var getContent = (category) => {
  fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
  .then((response) => {
    // console.log(response);
    return response.json();
  })
  .then((json) => {
    // console.log(json);
    setContent(json);
  });
}

var setContent = (content) => {
  let textContent = document.getElementById('text-content');
  textContent.innerHTML = content['value'];
  getGiphy(content['value']);
}

var getGiphy = (value) => {
  let valueArray = value.split(' ');
  fetch(`http://api.giphy.com/v1/gifs/search?q=${valueArray[0]}+${valueArray[1]}+${valueArray[2]}&api_key=cpuD23c9SvL1rTFUz7st0tQJNplbZ7Cl&limit=1`)
  .then((response) => {
    return response.json();
  })
  .then((json) => {
    setGiphy(json);
    // console.log(json,'giphy');
  });
}

var setGiphy = (json) => {
  console.log(json);
  let imgContent = document.getElementById('img-content');
  imgContent.src = json.data['0'].images['480w_still'].url;
  // console.log(json.data['0'].embed_url);
}
