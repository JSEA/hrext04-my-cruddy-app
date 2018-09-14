$(document).ready(function() {
  var form = document.querySelector('form');
  var div = document.querySelector('div');
  var button = document.querySelector('button');
  var input = document.getElementById('text_box');

  var buttonDelete = document.createElement("button");
  buttonDelete.innerHTML = "delete";

  var entryArray;
  if (localStorage.getItem('entries')) {
    entryArray = JSON.parse(localStorage.getItem('entries'));
  } else {
    entryArray = [];
  }

  var data = JSON.parse(localStorage.getItem('entries'));

  //creates a new article tag with contents from text field
  var entry = function(text) {
    var editDelete = "<br><button type='button' id = 'edit-text-btn'> Edit </button> <button type='button' id = 'del-text-btn'> Delete </button> <br>"
    var article = document.createElement('article');
    article.setAttribute('id', 'ent');
    article.innerHTML = 'On' + " " + moment(new Date()).format('MMMM Do YYYY, @ hA') + " you wrote:" + " " + text + editDelete;
    document.getElementById('de').insertBefore(article, document.body.childNodes[1].children[4].children[0]);

    //delete a journal entry
    document.getElementById('del-text-btn').addEventListener('click', function() {
      if (confirm('Are You Sure You Want To Delete The Entry?')) {
        // var le = JSON.parse(localStorage.entries);
        entryArray.splice(article, 1);
        localStorage.setItem('entries', JSON.stringify(entryArray));
        article.remove();
      }
    });
  };

  //submit a journal entry
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    entryArray.unshift(input.value);
    localStorage.setItem('entries', JSON.stringify(entryArray));
    entry(input.value);
    input.value = "";
  });

  data.forEach(item => {
    entry(item);
  });

  //Delete all entries
  document.getElementById('clear_all').addEventListener('click', function() {
    if (confirm('Are You Sure You Want To Clear All Entries?')) {
      localStorage.clear();
      while (document.getElementById('de').firstChild) {
        document.getElementById('de').removeChild(document.getElementById('de').firstChild);
      }
    }
  });



});