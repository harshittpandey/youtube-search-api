$(function() {
	$('#search-box').submit(function(e) {
		e.preventDefault();
	});
});

function youtubesearch() {
	$('#results').html('');
	$('#buttons').html('');

	q= $('#query').val();

	$.get(
		'https://www.googleapis.com/youtube/v3/search', {
			part: 'snippet, id',
			q: q,
			type: 'video',
        	maxResults: 10,
			key: 'AIzaSyDKgfnoe_lxIK6D8mvzcxv74owBmmwVeK4'
		},
		function(data) {
			var nextPageToken = data.nextPageToken;
			var prevPageToken = data.prevPageToken;
			console.log(data.items);

			var sortt= data.items;

		      sortt.sort(function (first, second) {
		        if(first.snippet.title > second.snippet.title) return 1;
		        if(first.snippet.title < second.snippet.title) return-1;

		        if(first.snippet.publishedAt > second.snippet.publishedAt) return 1;
		        if(first.snippet.publishedAt < second.snippet.publishedAt) return-1;        
		      });

			$.each(data.items, function(i, item){
				var output= getOutput(item);

				$('#results').append(output);
			});

			var buttons = getButtons(prevPageToken, nextPageToken);

			$('#buttons').append(buttons);
		}
	);
}


function nextPage() {
	var nexttoken = $('#next-button').data('token');
	var q = $('#next-button').data('query');

	$('#results').html('');
	$('#buttons').html('');
	
	q= $('#query').val();

	$.get(
      "https://www.googleapis.com/youtube/v3/search", {
        part: 'snippet, id',
        q: q,
        pageToken: nexttoken,
        type: 'video',
        maxResults: 10,
        key: 'AIzaSyCRuzNBx3ZHDLnipHcQgjc5gioXKpg6EVM'
      },
      function(data) {
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;

        // console.log(data);
      
        var sortt= data.items;

	      sortt.sort(function (first, second) {
	        if(first.snippet.title > second.snippet.title) return 1;
	        if(first.snippet.title < second.snippet.title) return-1;

	        if(first.snippet.publishedAt > second.snippet.publishedAt) return 1;
	        if(first.snippet.publishedAt < second.snippet.publishedAt) return-1;        
	      });

        $.each(data.items, function(i, item) {
          var output = getOutput(item);
          $('#results').append(output);
        });

        var buttons = getButtons(prevPageToken, nextPageToken);
        $('#buttons').append(buttons);
      }
    );
}

function prevPage() {
	var prevtoken = $('#prev-button').data('token');
	var q = $('#next-button').data('query');

	$('#results').html('');
	$('#buttons').html('');
	
	q= $('#query').val();

	$.get(
      "https://www.googleapis.com/youtube/v3/search", {
        part: 'snippet, id',
        q: q,
        pageToken: prevtoken,
        type: 'video',
        maxResults: 10,
        key: 'AIzaSyCRuzNBx3ZHDLnipHcQgjc5gioXKpg6EVM'
      },
      function(data) {
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;

        // console.log(data);
	        var sortt= data.items;

	      sortt.sort(function (first, second) {
	        if(first.snippet.title > second.snippet.title) return 1;
	        if(first.snippet.title < second.snippet.title) return-1;

	        if(first.snippet.publishedAt > second.snippet.publishedAt) return 1;
	        if(first.snippet.publishedAt < second.snippet.publishedAt) return-1;        
	      });
        $.each(data.items, function(i, item) {
          var output = getOutput(item);
          $('#results').append(output);
        });

        var buttons = getButtons(prevPageToken, nextPageToken);
        $('#buttons').append(buttons);
      }
    );
}

function getOutput(item) {
	var videoId = item.id.videoId;
	var title = item.snippet.title;
	var description = item.snippet. description;
	var thumb = item.snippet.thumbnails.high.url;
	var channelTitle = item.snippet.channelTitle;
	var videoDate = item.snippet.publishedAt;

	var output = '<li class="card">'+ 
		'<div class="thumbnail">'+
	    '<img class="left" src="' + thumb + '">' +
	    '</div>' +
	    '<div class="right">' +
		  '<h3 class="heading1">'+title+'</h3>' +
		   '<div class="author"> <h2 class="heading2">'+channelTitle+ '</h2> </div>'+
		   '<div class="date" >'+videoDate+'</div>'
	    // '<small>By <span class="">'+channelTitle+'</span> on '+videoDate+'</small>' +
	    // '<p>'+description+'</p>' +
	    '</div>' +
	    '</li>' +
	    '<div class="clearfix"></div>' +
	    '';

	return output;
}

function getButtons (prevPageToken, nextPageToken) {
	if(!prevPageToken) {
		var buttonop = '<div class="">'+ 
			'<button id="next-button" class="btndesign" data-token="'+ nextPageToken + '" data-query="' + q + '"' + 'onclick="nextPage();"> Next Page</button></div>';	 
	}
	else if(!nextPageToken) {
		var buttonop = '<div class="">'+ 
			'<button id="prev-button" class="btndesign" data-token="'+ prevPageToken + '" data-query="' + q + '"' + 'onclick="prevPage();"> Previous Page</button></div>';	 
	}
	else {
	    var buttonop = '<div class=" ">' +
	      '<button id="prev-button" class="btndesign" data-token="'+prevPageToken+'" data-query="'+q+'"' + 'onclick="prevPage();">Prev Page</button>' +
	      '<button id="next-button" class="btndesign" data-token="'+nextPageToken+'" data-query="'+q+'"' + 'onclick="nextPage();">Next Page</button></div>';
  	}
  return buttonop;	
}