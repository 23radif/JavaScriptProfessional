$(document).ready(() => {
  // Товары
  let product1 = new Product(123, 'Ноутбук', 45600);
  let product2 = new Product(124, 'Мышь', 600);
  let product3 = new Product(125, 'Клавиатура', 1600);

  //Корзина
  let cart = new Cart('getCart.json');

  //Добавление товара
  $('.buyBtn').click(e => {
    cart.addProduct(e.target);
  });

  //Модуль отзывов
  let reviews = new Reviews('feedback.json');

  //jQuery UI
  $("#accordion").accordion({});

  $('#my-autocomplete').autocomplete({
    source: ["Дмитрий", "Мария", "Владимир", "Алексей", "Екатерина", "Олег", "Ольга"],
    minLength: 0
  });

  $('#datepicker').datepicker({});
  $("#datepicker").datepicker();
  $("#datepicker").datepicker({
    monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    firstDay: 1,
    dateFormat: "dd.mm.yy"
  });

  $("#groupradio").buttonset();

  $("#tabs").tabs({});

  // $("#dialog").dialog({width: 400, height: 300});


  $("#dialog1").dialog({
    autoOpen: false,
    buttons: {
      OK: function () {
        $(this).dialog("close");
        alert("Вы нажали ОК");
      }
    }
  });
  $("#dialog2").dialog({
    autoOpen: false,
    buttons: {
      OK: function () {
        $(this).dialog("close");
        alert("Вы нажали ОК");
      },
      Отмена: function () {
        $(this).dialog("close");
        alert("Вы нажали Отмена");
      }
    }
  });
  $("#but1").click(function () {
    $("#dialog1").dialog("open");
  });
  $("#but2").click(function () {
    $("#dialog2").dialog("open");
  });


  $("#slider").slider();

  $("#but3").click(function(){
    $("#testcontainer").animate({
      borderColor:"#EA3B53",
      borderWidth:3,
      backgroundColor:"#97D400",
      width:500,
      height:160},1500);
  });

  $("#but4").click(function(){
    $(".el1").addClass("newclass",1000);
  });
  $("#but5").click(function(){
    $(".el1").removeClass("newclass",1000);
  });
  $("#but6").click(function(){
    $(".el1").toggleClass("newclass",1000);
  });
  $("#but7").click(function(){
    $(".el1").switchClass("el1","newclass");
  });


    $( "#draggable" ).draggable({
      axis: 'x',
      revert: true,
      containment: 'parent'
    });

});