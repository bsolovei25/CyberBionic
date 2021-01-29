class Author{
    constructor(name,surname,lastname = '',date_birth,book_list) {
    StaticValidator.validate_type({'string':[name,surname],'Date':date_birth,'Book':book_list})
    StaticValidator.validate_empty(surname,name,date_birth,book_list)
    this.surname = surname;
    this.name = name;
    this.lastname = lastname;
    this.date_birth = date_birth;
    this.book_list = book_list;
  }
}


class Book{
  constructor(book_name,size,genre) {
    StaticValidator.validate_type({'string':[book_name,genre],'number':size})
    StaticValidator.validate_empty(book_name,size,genre)
    StaticValidator.is_positive(size)
    this.book_name = book_name;
    this.size = size;
    this.genre = genre;
  }
}

class StaticValidator{
  static validate_type(args) {
    for (var key in args){
      if (args[key] instanceof Array){
        
        for (var k in args[key])
        {
          if (!(typeof args[key][k] == key || (args[key][k] instanceof Book))){
            throw `${key} must be typed as ${typeof(args[key][k])}`
          }
        }
      }
      else{
        if (!(args[key] instanceof Date)){
          if (!(args[key] instanceof Book)){
            if (typeof args[key] != key){
              throw `${key} must be typed as ${typeof(args[key][k])}`;
            }
          }
        }
      }
    } 
  }
  static validate_empty(...args) {
    args.forEach(function(items) {
      if (items.length == 0 || items == undefined){throw `element must not be empty`}
    })
  }
  static is_positive(...args) {
    args.forEach(function(items) {
      if (items < 0){throw `element must not be negative`}
    })
  }  
}

function saveObj(object){

  // Retrieve the object from storage
  var arrofAuthors = []
  var retrievedObject = localStorage.getItem('SetofAuthors');
  
  if (localStorage.getItem("SetofAuthors") != null) {
    arrofAuthors=JSON.parse(retrievedObject)
  }

  arrofAuthors.push(object)
  // Put the object into storage
  localStorage.setItem('SetofAuthors', JSON.stringify(arrofAuthors));
  
  // Retrieve the object from storage
  var finalObject = localStorage.getItem('SetofAuthors');

  
  
  console.log('retrievedObject: ', JSON.parse(finalObject));
}

function clearInputs() {
  document.getElementById('inputBookName').value = ''
  document.getElementById('inputBookSize').value = ''
  document.getElementById('inputBookGenre').value = ''
  document.getElementById('inputName').value = ''
  document.getElementById('inputSurname').value = ''
  document.getElementById('inputLastname').value = ''
  document.getElementById('inputDate').value = ''
}

function clearInputsBook() {
  document.getElementById('inputBookName').value = ''
  document.getElementById('inputBookSize').value = ''
  document.getElementById('inputBookGenre').value = ''
}

function NoBooks() {
  document.querySelector('.BookNameVis').style.display ='none'
  document.querySelector('.BookSizeVis').style.display ='none'
  document.querySelector('.BookGenreVis').style.display ='none'
}

function NoAuthor() {
  document.querySelector('.inputNameVis').style.display = 'none'
  document.querySelector('.inputSurnameVis').style.display = 'none'
  document.querySelector('.inputLastnameVis').style.display = 'none'
  document.querySelector('.inputDateVis').style.display = 'none'
}

function NoAuthorWritable() {
  document.querySelector('#inputName').setAttribute('readonly', true); 
  document.querySelector('#inputSurname').setAttribute('readonly', true); 
  document.querySelector('#inputLastname').setAttribute('readonly', true); 
  document.querySelector('#inputDate').setAttribute('readonly', true); 
  
}

function YesBooks() {
  document.querySelector('.BookNameVis').style.display ='block'
  document.querySelector('.BookSizeVis').style.display ='block'
  document.querySelector('.BookGenreVis').style.display ='block'
}

document.getElementById("addAuthor").addEventListener('click',function () {
  document.getElementById('z_indexForNewAuthorid').style.display = 'block'
  document.querySelector('.AddNewGenreDiv').style.display = 'none'
  document.getElementById('genres_buttonid').style.display = 'block'//inputBookGenre
  document.getElementById('adding_new_author_action').style.display = 'block'
  document.getElementById('editing_author_action').style.display = 'none'
  document.querySelector('.BookNameVis').style.display = 'block'
  document.querySelector('.BookSizeVis').style.display = 'block'
  document.querySelector('.BookGenreVis').style.display = 'block'
  document.querySelector("#avalibleBookCollection").style.display = 'none'
  document.querySelector("#idvaddbooktoCollection").style.display = 'none'
  document.getElementById('inputName').readOnly = false;
  document.getElementById('inputSurname').readOnly = false;
  document.getElementById('inputLastname').readOnly = false;
  document.getElementById('inputDate').readOnly = false;
  document.getElementById('ConfirmChangeBook').style.display = 'none'
  ClearList()
  FillSelectList()
  
  clearInputs()
})

function RaiseIfUndefined() {
  if (document.getElementById('inputName').value == '' || document.getElementById('inputSurname').value=='' || document.getElementById('inputDate').valueAsDate==''){
    throw "Form field must not be empty"
  }
}
function CapitalFirstStrings(name) {
  return name.charAt(0).toUpperCase() + name.slice(1)
} 

document.getElementById('editing_author_action').addEventListener('click',function () {
  var retrievedObject = localStorage.getItem('SetofAuthors');
  parsedObj = JSON.parse(retrievedObject);
  bookname = document.getElementById('booknameLib0').value;
  booksize = document.getElementById('booknsizeLib0').value;
  bookgenre = document.getElementById('bookngenreLib0').value;
  RaiseIfUndefined()
  for (i in parsedObj){
    for (j in parsedObj[i].book_list)
    if (parsedObj[i].book_list[j].book_name == bookname && parsedObj[i].book_list[j].size == booksize && parsedObj[i].book_list[j].genre == CapitalFirstStrings(bookgenre)){
      parsedObj[i].name = document.getElementById('inputName').value
      parsedObj[i].lastname = document.getElementById('inputLastname').value
      parsedObj[i].surname = document.getElementById('inputSurname').value
      parsedObj[i].date_birth = document.getElementById('inputDate').valueAsDate
    }
  }
  localStorage.setItem('SetofAuthors', JSON.stringify(parsedObj));
  location.reload();
})

function CapitalFirst(name) {
  return name.value.charAt(0).toUpperCase() + name.value.slice(1)
} 



function NONCapitalFirst(name) {
  return name.value.charAt(0).toLowerCase() + name.value.slice(1)
} 

document.getElementById("adding_new_author_action").addEventListener('click',function () {
  var inputBookName = document.getElementById('inputBookName').value
  var inputBooSize = document.getElementById('inputBookSize').valueAsNumber
  //var inputBookGenre = document.getElementById('inputBookGenre').value.charAt(0).toUpperCase() + document.getElementById('inputBookGenre').value.slice(1)
  var inputBookGenre = CapitalFirst(document.getElementById('inputBookGenre'))
  var author_name = document.getElementById('inputName').value
  var author_surname = document.getElementById('inputSurname').value
  var author_lastname = document.getElementById('inputLastname').value
  var author_date = document.getElementById('inputDate').valueAsDate
  var book = [new Book(inputBookName,inputBooSize,inputBookGenre)]
  var author = new Author(author_name,author_surname,author_lastname,author_date,book) 
  saveObj(author);
})

document.getElementById('addbooktoCollection').addEventListener('click',function() {
  YesBooks()
  NoAuthorWritable()
  document.getElementById('idConfirmChangeBook').style.display = 'block'
  document.getElementById('idediting_author_action').style.display = 'none'
  document.getElementById('idvaddbooktoCollection').style.display = 'none'
  document.getElementById('avalibleBookCollection').style.display = 'none'
  document.querySelector('.AddNewGenreDiv').style.display = 'none'
  document.getElementById('genres_buttonid').style.display = 'block'
  document.getElementById('ConfirmChangeBook').style.display = 'block'
  ClearList()
  FillSelectList()
  clearInputsBook('')
})

function HeaderOptionsBlock() {
  document.getElementById('genres_buttonid').style.display = 'none'
  document.getElementById('searchForBooks').style.display = 'none'
  document.getElementById('addAuthor').style.display = 'none'
  document.getElementById('ExsistantAuthors').style.display = 'none'
  document.querySelector('.Headers').style.display = 'none'
  document.getElementById('z_indexForNewAuthorid').style.display = 'none'
  document.getElementById('addbooktoCollection').style.display = 'none'
}

document.getElementById('genres_buttonid').addEventListener('click',function() {
  document.querySelector('.AddNewGenreDiv').style.display = 'block'
  HeaderOptionsBlock()
})

document.getElementById('searchForBooks').addEventListener('click',function() {
  document.querySelector('.GetBook').style.display = 'block'
  HeaderOptionsBlock()
})

document.getElementById('SearchBooksid').addEventListener('click',function () {
  
  var SearchedField = document.getElementById('BookName').value
  if (SearchedField == ''){
    throw 'Book Name must not be empty'
  }
  var BooksForEachAuthor = document.getElementById('FoundBooks')
  var retrievedObject = localStorage.getItem('SetofAuthors');
  parsedObj = JSON.parse(retrievedObject);
  if (BooksForEachAuthor.childElementCount != 0){
    while (BooksForEachAuthor.firstChild) {
      BooksForEachAuthor.removeChild(BooksForEachAuthor.lastChild);
    }
  }
  for (var i =0; i < parsedObj.length;i++){
    for (var j =0;j < parsedObj[i].book_list.length;j++){
        if (parsedObj[i].book_list[j].book_name == SearchedField){
          BookNameDiv = document.createElement("div");
          BookNameDiv.className = "col-md-4";
          BookNameDiv.id = 'bookfoundnamediv'+i
          BookNameInput = document.createElement("INPUT");
          BookNameInput.setAttribute("type", "text");
          BookNameInput.setAttribute("id", 'bookfoundname'+i);
          BookNameInput.setAttribute("value", parsedObj[i].book_list[j].book_name);
          BookNameInput.setAttribute("class", 'form-control');
          BookNameInput.setAttribute('readonly', true); 

          BookSizeDiv = document.createElement("div");
          BookSizeDiv.className = "col-md-4";
          BookSizeDiv.id = 'bookfoundsizediv'+i
          BookSizeInput = document.createElement("INPUT");
          BookSizeInput.setAttribute("type", "text");
          BookSizeInput.setAttribute("id", "bookfoundsize"+i);
          BookSizeInput.setAttribute("value", parsedObj[i].book_list[j].size);
          BookSizeInput.setAttribute("class", 'form-control');
          BookSizeInput.setAttribute('readonly', true); 
          
          BookGenreDiv = document.createElement("div");
          BookGenreDiv.className = "col-md-4";
          BookGenreDiv.id = 'bookfoundgenrediv'+i
          BookGenreInput = document.createElement("INPUT");
          BookGenreInput.setAttribute("type", "text");
          BookGenreInput.setAttribute("id", "bookfoundgenre"+i);
          BookGenreInput.setAttribute("value", parsedObj[i].book_list[j].genre);
          BookGenreInput.setAttribute("class", 'form-control');
          BookGenreInput.setAttribute('readonly', true);

          BookNameDiv.style.marginTop = '2%'
          BookSizeDiv.style.marginTop = '2%'
          BookGenreDiv.style.marginTop = '2%'

          BooksForEachAuthor.appendChild(BookNameDiv)
          BookNameDiv.appendChild(BookNameInput)

          BooksForEachAuthor.appendChild(BookSizeDiv)
          BookSizeDiv.appendChild(BookSizeInput)

          BooksForEachAuthor.appendChild(BookGenreDiv)
          BookGenreDiv.appendChild(BookGenreInput)

        }
      }
    }
})

document.getElementById('ConfirmChangeBook').addEventListener('click',function () {
  var retrievedObject = localStorage.getItem('SetofAuthors');
  parsedObj = JSON.parse(retrievedObject);
  var name = document.getElementById('inputName').value
  var surname = document.getElementById('inputSurname').value
  var lastname = document.getElementById('inputLastname').value
  var index = 0
  for (var i =0;i<parsedObj.length;i++){
    if (parsedObj[i].name == name && parsedObj[i].surname == surname && parsedObj[i].lastname == lastname){
      index = i
      break;
    }
  }
  book = new Book(document.getElementById('inputBookName').value,document.getElementById('inputBookSize').valueAsNumber,CapitalFirst(document.getElementById('inputBookGenre')))
  parsedObj[index].book_list.push(book)
  localStorage.setItem('SetofAuthors', JSON.stringify(parsedObj));
  
})

function ConvertToDate(time) {
  var date = new Date(time);
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);
      
  return `${year}-${month}-${day}`;
}

function ClearList() {
  if (localStorage.getItem("SetofGenres") != null){
    var selectGenres = document.getElementById('inputBookGenre')
    while (selectGenres.firstChild) {
      selectGenres.removeChild(selectGenres.lastChild);
    }
  }    
}

function FillSelectList() {
  if (localStorage.getItem("SetofGenres") != null){
    var GenresObject = localStorage.getItem('SetofGenres');
    var ParsedGenres = JSON.parse(GenresObject)    

    var selectGenres = document.getElementById('inputBookGenre')
    for (var k = 0;k < ParsedGenres.length;k++){
      selectGenres.options[selectGenres.options.length] = new Option(ParsedGenres[k][0],ParsedGenres[k][1])
    }
  }
}

window.onload = function() {
  
        

  var retrievedObject = localStorage.getItem('SetofAuthors');
  parsedObj = JSON.parse(retrievedObject);
  ParentNode = document.getElementById('ExsistantAuthors')
  
  parsedObj.sort(function(a,b) {
    if (a.name < b.name){return -1}
    if (a.name > b.name){return 1}
    return 0
  })

  if (retrievedObject != null){
  var GLOBALLENGTH = parsedObj.length
  for (var i=0;i< parsedObj.length;i++){
    NameDiv = document.createElement("div");
    NameDiv.className = "col-sm-3";
    NameDiv.innerHTML = parsedObj[i].name+'.'+parsedObj[i].surname[0]+'.'+parsedObj[i].lastname[0];
    NameDiv.style.marginTop = '2%'

    SizeBooksDiv = document.createElement("div");
    SizeBooksDiv.className = "col-sm-3";
    SizeBooksDiv.innerHTML = parsedObj[i].book_list.length;
    SizeBooksDiv.style.marginTop = '2%'


    EditBookDiv = document.createElement("div");
    EditBookDiv.className = "col-sm-2";
    EditButtonBookDiv = document.createElement("button");
    EditButtonBookDiv.type = 'text'
    EditButtonBookDiv.id = 'EditAuthor'+i;
    EditButtonBookDiv.className = 'btn btn-warning'
    EditButtonBookDiv.textContent = 'author edit'
    EditBookDiv.style.marginTop = '2%'


    DeleteBookDiv = document.createElement("div");
    DeleteBookDiv.className = "col-sm-2";
    DeleteButtonBookDiv = document.createElement("button");
    DeleteButtonBookDiv.type = 'text'
    DeleteButtonBookDiv.id = 'DeleteAuthor'+i;
    DeleteButtonBookDiv.className = 'btn btn-danger'
    DeleteButtonBookDiv.textContent = 'author delete'
    DeleteBookDiv.style.marginTop = '2%'

    InfoBookDiv = document.createElement("div");
    InfoBookDiv.className = "col-sm-2";
    InfoButtonBookDiv = document.createElement("button");
    InfoButtonBookDiv.type = 'text'
    InfoButtonBookDiv.id = 'InfoAuthor'+i;
    InfoButtonBookDiv.className = 'btn btn-info'
    InfoButtonBookDiv.textContent = 'author info'
    InfoBookDiv.style.marginTop = '2%'
    FillSelectList()
    ParentNode.appendChild(NameDiv)
    ParentNode.appendChild(SizeBooksDiv)
    
    
    ParentNode.appendChild(EditBookDiv)
    EditBookDiv.appendChild(EditButtonBookDiv)

    ParentNode.appendChild(DeleteBookDiv)
    DeleteBookDiv.appendChild(DeleteButtonBookDiv)

    ParentNode.appendChild(InfoBookDiv)
    InfoBookDiv.appendChild(InfoButtonBookDiv)
  }
  for (var j =0;j<GLOBALLENGTH;j++){
    document.getElementById('DeleteAuthor'+j).addEventListener('click',function() {
      index = parseInt((event.toElement.id).slice(event.toElement.id.length-1, event.toElement.id.length))
      parsedObj.splice(index,1)
      localStorage.setItem('SetofAuthors', JSON.stringify(parsedObj));
      location.reload();

    });
    document.getElementById('InfoAuthor'+j).addEventListener('click',function() {
      document.querySelector('.AddNewGenreDiv').style.display = 'none'
      document.getElementById('genres_buttonid').style.display = 'block'
      index = parseInt((event.toElement.id).slice(event.toElement.id.length-1, event.toElement.id.length))
      document.getElementById('z_indexForNewAuthorid').style.display = 'block'
      document.getElementById('adding_new_author_action').style.display = 'none'
      document.getElementById('avalibleBookCollection').style.display = 'flex'
      NoBooks()
      document.getElementById('inputName').readOnly = false;
      document.getElementById('inputSurname').readOnly = false;
      document.getElementById('inputLastname').readOnly = false;
      document.getElementById('inputDate').readOnly = false;
      document.getElementById('ConfirmChangeBook').style.display= 'none'
      document.getElementById('inputName').value = parsedObj[index].name
      document.getElementById('inputSurname').value = parsedObj[index].surname
      document.getElementById('inputLastname').value = parsedObj[index].lastname
      document.getElementById('inputDate').value = ConvertToDate(Date.parse(parsedObj[index].date_birth))
      document.getElementById('inputBookName').value = parsedObj[index].book_list.book_name
      document.getElementById('inputBookSize').value = parsedObj[index].book_list.size
      document.getElementById('inputBookGenre').value = parsedObj[index].book_list.genre
      document.getElementById('inputName').readOnly = true
      document.getElementById('inputSurname').readOnly = true
      document.getElementById('inputLastname').readOnly = true
      document.getElementById('inputDate').readOnly = true
      document.getElementById('avalibleBookCollection').style.display = 'none'
      document.getElementById('editing_author_action').style.display = 'none'
      document.getElementById('addbooktoCollection').style.display = 'none'
    });


    document.getElementById('EditAuthor'+j).addEventListener('click',function() {
      index = parseInt((event.toElement.id).slice(event.toElement.id.length-1, event.toElement.id.length))
      document.getElementById('z_indexForNewAuthorid').style.display = 'block'
      document.getElementById("idvaddbooktoCollection").style.display = 'flex'
      document.getElementById('adding_new_author_action').style.display = 'none'
      document.querySelector('.AddNewGenreDiv').style.display = 'none'
      document.getElementById('genres_buttonid').style.display = 'block'
      document.getElementById('editing_author_action').style.display = 'block'
      document.getElementById('idediting_author_action').style.display = 'block'
      document.getElementById('avalibleBookCollection').style.display = 'flex'
      NoBooks()
      document.getElementById('inputName').readOnly = false;
      document.getElementById('inputSurname').readOnly = false;
      document.getElementById('inputLastname').readOnly = false;
      document.getElementById('inputDate').readOnly = false;
      document.getElementById('ConfirmChangeBook').style.display= 'none'

      document.getElementById('inputName').value = parsedObj[index].name
      document.getElementById('inputSurname').value = parsedObj[index].surname
      document.getElementById('inputLastname').value = parsedObj[index].lastname
      document.getElementById('inputDate').value = ConvertToDate(Date.parse(parsedObj[index].date_birth))
      document.getElementById('inputBookName').value = parsedObj[index].book_list.book_name
      document.getElementById('inputBookSize').value = parsedObj[index].book_list.size  
      document.getElementById('inputBookGenre').value = parsedObj[index].book_list.genre

      var BooksForEachAuthor = document.getElementById('avalibleBookCollection')
      var booklistlen = parsedObj[index].book_list.length
      if (BooksForEachAuthor.childElementCount != 0){
        while (BooksForEachAuthor.firstChild) {
          BooksForEachAuthor.removeChild(BooksForEachAuthor.lastChild);
        }
      }

      for (var i =0;i < booklistlen;i++){
        BookNameDiv = document.createElement("div");
        BookNameDiv.className = "col-sm-3";
        BookNameDiv.id = 'idbooknameLib'+i
        BookNameInput = document.createElement("INPUT");
        BookNameInput.setAttribute("type", "text");
        BookNameInput.setAttribute("id", 'booknameLib'+i);
        BookNameInput.setAttribute("value", parsedObj[index].book_list[i].book_name);
        BookNameInput.setAttribute("class", 'form-control');
        BookNameInput.setAttribute('readonly', true); 
  
        BookSizeDiv = document.createElement("div");
        BookSizeDiv.className = "col-sm-3";
        BookSizeDiv.id = 'idbooknsizeLib'+i
        BookSizeInput = document.createElement("INPUT");
        BookSizeInput.setAttribute("type", "text");
        BookSizeInput.setAttribute("id", "booknsizeLib"+i);
        BookSizeInput.setAttribute("value", parsedObj[index].book_list[i].size);
        BookSizeInput.setAttribute("class", 'form-control');
        BookSizeInput.setAttribute('readonly', true); 
        
  
        BookGenreDiv = document.createElement("div");
        BookGenreDiv.className = "col-sm-3 BookGenreVis";
        BookGroupDiv = document.createElement("div");
        BookGroupDiv.className = "input-group mb-3";
        BookSelectGroup = document.createElement("select");
        BookSelectGroup.setAttribute('class',"custom-select")
        
        

        BookSelectGroup.setAttribute('id','bookngenreLib'+i) 
        var GenresObject = localStorage.getItem('SetofGenres');
        var ParsedGenres = JSON.parse(GenresObject)
        for (var ii =0;ii <ParsedGenres.length;ii++){
          BookSelectGroup.options[ii] = new Option(ParsedGenres[ii][0],ParsedGenres[ii][1])
          if (BookSelectGroup.options[ii].innerHTML == parsedObj[index].book_list[i].genre){
            BookSelectGroup[ii].selected = 'selected' 
          }
        }

        BookButtonDiv = document.createElement("div");
        BookButtonDiv.className = "col-sm-1";
        BookButtonDiv.id = "idchangeBookButton"+i;
        BookButton = document.createElement("button");
        BookButton.setAttribute('type','submit')
        BookButton.setAttribute('id','changeBookButton'+i)
        BookButton.setAttribute('class','btn btn-primary')
        BookButton.textContent = 'EditBook';

        BookSubmitButtonDiv = document.createElement("div");
        BookSubmitButtonDiv.className = "col-sm-1";
        BookSubmitButtonDiv.id = "idsubmitBookDiv"+i;
        BookSubmitButton = document.createElement("button");
        BookSubmitButton.hidden = true;
        BookSubmitButton.setAttribute('id','submitchangeBookButton'+i)
        BookSubmitButton.setAttribute('class','btn btn-primary')
        BookSubmitButton.textContent = 'SubmitChange'
  
        BookNameDiv.style.marginTop = '2%'
        BookSizeDiv.style.marginTop = '2%'
        BookGenreDiv.style.marginTop = '2%'
        BookButtonDiv.style.marginTop = '2%'
        BookSubmitButtonDiv.style.marginTop = '2%'

        BooksForEachAuthor.appendChild(BookNameDiv)
        BookNameDiv.appendChild(BookNameInput)
  
        BooksForEachAuthor.appendChild(BookSizeDiv)
        BookSizeDiv.appendChild(BookSizeInput)
        

        BooksForEachAuthor.appendChild(BookGenreDiv)
        BookGenreDiv.appendChild(BookGroupDiv)
        BookGroupDiv.appendChild(BookSelectGroup)
        
        BooksForEachAuthor.appendChild(BookSubmitButtonDiv)
        BookSubmitButtonDiv.appendChild(BookSubmitButton)

        BooksForEachAuthor.appendChild(BookButtonDiv)
        BookButtonDiv.appendChild(BookButton)
  

        BookSubmitButton.addEventListener('click',function() {
          currentNumberBook = parseInt((event.target.id).slice(event.target.id.length-1, event.target.id.length))
          var boknameLib = document.getElementById('booknameLib'+ currentNumberBook)
          var boksizeLib =document.getElementById('booknsizeLib'+ currentNumberBook)
          var bokgenreLib = CapitalFirst(document.getElementById('bookngenreLib'+ currentNumberBook))

          

          parsedObj[index].book_list[currentNumberBook].book_name = boknameLib.value
          parsedObj[index].book_list[currentNumberBook].size = parseInt(boksizeLib.value)
          parsedObj[index].book_list[currentNumberBook].genre = bokgenreLib
          localStorage.setItem('SetofAuthors', JSON.stringify(parsedObj));
          location.reload();
        })

        BookButton.addEventListener('click',function() {
          currentNumberBook = parseInt((event.target.id).slice(event.target.id.length-1, event.target.id.length))
          var boknameLib = document.getElementById('booknameLib'+ currentNumberBook)
          var boksizeLib =document.getElementById('booknsizeLib'+ currentNumberBook)
          var bokgenreLib = document.getElementById('bookngenreLib'+ currentNumberBook)
          boknameLib.readOnly = false
          boksizeLib.readOnly = false
          bokgenreLib.readOnly = false
          document.getElementById('changeBookButton'+currentNumberBook).hidden = true;
          document.getElementById('submitchangeBookButton'+currentNumberBook).hidden = false;
        })
  
      }
      

    })
  }
  }
};



document.getElementById('addnewgenreid').addEventListener('click',function () {
  var select=document.querySelector('#inputBookGenre')
  var input=document.querySelector('#AddNewGenre')
  if (input.value == '')
  {
    throw "Genre must not be empty"
  }

  saveGenre(CapitalFirst(input),NONCapitalFirst(input))
  location.reload();
})

function saveGenre(...object){

  // Retrieve the object from storage
  var arrofGenres = []
  var retrievedObject = localStorage.getItem('SetofGenres');
  
  if (localStorage.getItem("SetofGenres") != null) {
    arrofGenres=JSON.parse(retrievedObject)
  }
  

  arrofGenres.push(object)
  // Put the object into storage
  localStorage.setItem('SetofGenres', JSON.stringify(arrofGenres));
  
  // Retrieve the object from storage
  var finalObject = localStorage.getItem('SetofGenres');

  
  
  console.log('retrievedObject: ', JSON.parse(finalObject));
}