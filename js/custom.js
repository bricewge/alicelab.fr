// ------- PRELOADER -------//
$(window).load(function(){
    $('.preloader').fadeOut("slow"); // set duration in brackets    
});

// ----- OPEN STREET MAP ----- //
function loadOpenStreetMap() {
    var mymap = L.map('mapid', {scrollWheelZoom: false}).setView([42.69843, 2.90185], 17);
    
    var OpenStreetMap_Mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mymap);
    
    var marker = L.marker([42.69843, 2.90185]).addTo(mymap)
	.bindPopup("<b>AliceLab</b><br />29 place du Puig<br />66000 Perpignan", {closeButton: false}).openPopup();
}

// ----- FULLCALENDAR ----- //
// $(document).ready(function() {
    
//     $('#calendar').fullCalendar({
// 	header: {
// 	    left: 'prev,next today',
// 	    center: 'title',
// 	    right: 'month,agendaWeek,agendaDay'
// 	},
// 	defaultDate: '2011-01-01',
//         lang: 'fr',
// 	editable: false,
// 	eventLimit: true, // allow "more" link when too many events
// 	events: {
// 	    url: 'json/events.json',
// 	    error: function() {
// 		$('#script-warning').show();
// 	    }
// 	},
//         eventColor: '#378006',
// 	loading: function(bool) {
// 	    $('#loading').toggle(bool);
// 	}
//     });
    
// });

  ics_sources = ['tmp/hackerspace.ics']

function data_req (url, callback) {
    req = new XMLHttpRequest()
    req.addEventListener('load', callback)
    req.open('GET', url)
    req.send()
}

function add_recur_events() {
    if (sources_to_load_cnt < 1) {
        $('#calendar').fullCalendar('addEventSource', expand_recur_events)
    } else {
        setTimeout(add_recur_events, 30)
    }
}

$(document).ready(function() {
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        defaultView: 'month',

        eventClick: function(calEvent, jsEvent, view) {
            $(this).popover({
		placement : 'bottom',
		title : calEvent.title,
		content : calEvent.description,
		trigger : 'focus',
	        container: 'body',
		html: true
            }).popover('show');
	    
            $(this).attr('tabindex', 0);
	    $(this).attr('role', 'button');
	}
    })
    sources_to_load_cnt = ics_sources.length
    for (ics of ics_sources) {
        data_req(ics, function(){
            $('#calendar').fullCalendar('addEventSource', fc_events(this.response))
            sources_to_load_cnt -= 1
        })
    }
    add_recur_events()
})

// // Bootstrap popover //
// $('html').on('click', function(e) {
//   $('.popover').each( function() {
//     if( $(e.target).parents(".fc-day-grid-event").get(0) !== $(this).prev().get(0) ) {
//       $(this).popover('hide');
//     }
//   });
// });

/* HTML document is loaded. DOM is ready. 
-------------------------------------------*/
$(function(){

   // --------- HIDE MOBILE MENU AFTER CLIKING ON A LINK ------- //
    $('.navbar-collapse a').click(function(){
        $(".navbar-collapse").collapse('hide');
    });

  // --------- PORTFOLIO IMAGE ----- //
  $('#portfolio a').nivoLightbox({
        effect: 'fadeScale',
    });

  // ------- WOW ANIMATED ------ //
  wow = new WOW(
  {
    mobile: false
  });
  wow.init();

  // ------- OPEN STREET MAP ----- //
  loadOpenStreetMap();

  // ------- JQUERY PARALLAX ---- //
  function initParallax() {
    $('#home').parallax("100%", 0.3);
    $('#team').parallax("100%", 0.3);
    $('#contact').parallax("100%", 0.1);

  }
  initParallax();

  // ------- SMOOTH SCROLLING ---- //
  smoothScroll.init();
    
});

