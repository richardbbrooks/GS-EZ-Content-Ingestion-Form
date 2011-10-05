function addProductContributor() {
    var divChildren = $('#contributors').children('[type="text"]').length;
    var productContributors = divChildren / 2;
    var html = '';
    html += '<input type="text" title="Role" data-xml="role" name="p_contributor_role_'+(productContributors+1)+'">&nbsp;';
    html += '<input type="text" title="Name" data-xml="name" name="p_contributor_name_'+(productContributors+1)+'"><br />';
    $('#contributors').append(html);
}

function addProductTerritory() {
    var divChildren = $('#territories').children('[type="text"]').length;
    var productTerritories = divChildren / 2;
    var html = '';
    html += '<input type="text" title="Country" data-xml="country" name="p_territory_country_'+(productTerritories+1)+'">&nbsp;';
    html += '<input type="text" title="Label" data-xml="label" name="p_territory_label_'+(productTerritories+1)+'"><br />';
    $('#territories').append(html);
}

function addTrack() {
    var trackCount = $('#tracks').children('li').length;
    var thisTrackID = trackCount+1;
    var html = '';
    html += '<li id="track'+thisTrackID+'">';
    html += '<input type="text" title="Artist" data-xml="artist" name="d1_artist_'+thisTrackID+'">&nbsp;';
    html += '<input type="text" title="Title" data-xml="title" name="d1_title_'+thisTrackID+'">&nbsp;';
    html += '<input type="text" title="ISRC" data-xml="isrc" name="d1_isrc_'+thisTrackID+'">&nbsp;';
    html += '<input type="text" title="Duration" data-xml="duration" name="d1_duration_'+thisTrackID+'">&nbsp;';
    html += '<input type="text" title="Language" data-xml="language" name="d1_language_'+thisTrackID+'">&nbsp;';
    html += '<input type="text" title="Release Date" data-xml="release_date" name="d1_release_date_'+thisTrackID+'">&nbsp;';
    html += '<input type="text" title="Genre" data-xml="genre" name="d1_genre_'+thisTrackID+'">&nbsp;';
    html += '<input type="text" title="Label" data-xml="label" name="d1_label_'+thisTrackID+'">&nbsp;';
    html += 'Explicit?<input title="Explicit" data-xml="explicit_lyrics" type="checkbox" name="d1_explicit_lyrics_'+thisTrackID+'" value="yes">';
    html += '<br />';
    html += '<h5>Contributors</h5>';
    html += '<div id="disk1_contributors_track'+thisTrackID+'">';
    html += '<input type="text" title="Role" data-xml="role" name="track'+thisTrackID+'_role_1" value="role">&nbsp;';
    html += '<input type="text" title="Name" data-xml="name" name="track'+thisTrackID+'_name_1" value="name">';
    html += '<input type="button" title="Add Contributor" name="addContributor" onclick="addContributorToTrack('+thisTrackID+')" value="Add Contributor"><br />';
    html += '</div>';
    html += '<h5>Territories</h5>';
    html += '<div id="disk1_territories_track'+thisTrackID+'">';
    html += '<input type="text" title="Role" data-xml="country" name="track'+thisTrackID+'_country_1" value="country">&nbsp;';
    html += '<input type="text" title="Label" data-xml="label" name="track'+thisTrackID+'_label_1" value="label">';
    html += '<input type="button" title="Add Territory" name="addTerritory" onclick="addTerritoryToTrack('+thisTrackID+')" value="Add Territory"><br />';
    html += '</div>';
    html += '</li>';
    $('#tracks').append(html);
}

function addContributorToTrack(trackNumber) {
    var el = $('#track'+trackNumber).children('#disk1_contributors_track'+trackNumber);
    var contributorCount = el.children('[type="text"]').length / 2;
    var thisContributorID = contributorCount + 1;
    var html = '';
    html += '<input type="text" title="Role" data-xml="role" name="track'+trackNumber+'_role_'+thisContributorID+'">&nbsp;'; 
    html += '<input type="text" title="Name" data-xml="name" name="track'+trackNumber+'_name_'+thisContributorID+'"><br />';
    el.append(html);
}

function addTerritoryToTrack(trackNumber) {
    var el = $('#track'+trackNumber).children('#disk1_territories_track'+trackNumber);
    var contributorCount = el.children('[type="text"]').length / 2;
    var thisContributorID = contributorCount + 1;
    var html = '';
    html += '<input type="text" title="Role" data-xml="country" name="track'+trackNumber+'_country_'+thisContributorID+'">&nbsp;'; 
    html += '<input type="text" title="Name" data-xml="label" name="track'+trackNumber+'_label_'+thisContributorID+'"><br />';
    el.append(html);

}

function generateXML() {
    elStaticContent = $('#static_content');
    staticContentInputs = elStaticContent.children('input');

    var staticContentXML = '';
    var contributorsXML = '';
    var territoriesXML = '';

    //PRODUCT STATIC ITEMS
    $.each(staticContentInputs, function(index, item) {
        contentInput = $(item);
        if(contentInput.attr('data-xml') == 'explicit_lyrics') {
            if(contentInput.is(':checked')) {
                staticContentXML += element(contentInput.attr('data-xml'), 'Yes');
            } else {
                staticContentXML += element(contentInput.attr('data-xml'), 'No');
            }
        } else {
            staticContentXML += element(contentInput.attr('data-xml'), contentInput.val());
        }
    });
    
    //PRODUCT CONTRIBUTORS
    elContributors = $('#contributors').children('[type="text"]');
    for(i=0; i<elContributors.length; i++) {
        var roleXML = element('role', $(elContributors[i]).val());
        var nameXML = element('name', $(elContributors[i+1]).val());
        contributorsXML += element('contributor', roleXML+nameXML);
        i++; //Iterate two by two.
    }
    contributorsXML = element('contributors', contributorsXML);

    //PRODUCT TERRITORIES
    elTerritories = $('#territories').children('[type="text"]');
    for(i=0; i<elTerritories.length; i++) {
        var countryXML = element('country', $(elTerritories[i]).val());
        var labelXML = element('label', $(elTerritories[i+1]).val());
        territoriesXML += element('territory', countryXML+labelXML);
        i++; //Iterate two by two.
    }
    territoriesXML = element('territories',territoriesXML);
    
    //DISK TRACKS
    elTracks = $('#tracks').children();
    var tracksXML = '';
    $.each(elTracks, function(index1, item1) {
        var trackXML = '';
        trackXML += element('number', index1+1);
        var elTrack = $(item1).children('input');
        //STATIC TRACK ITEMS
        $.each(elTrack, function(index2, item2) {
            var elInput = $(item2);
            if(elInput.attr('data-xml') == 'explicit_lyrics') {
                console.log(elInput);
                if(elInput.is(':checked')) {
                    trackXML += element(elInput.attr('data-xml'), 'Yes');
                } else {
                    trackXML += element(elInput.attr('data-xml'), 'No');
                }
            } else {
                trackXML += element(elInput.attr('data-xml'), elInput.val());
            }
        });
        //TRACK CONTRIBUTORS
        var elContributors = $(item1).children('.contributors').children('[type="text"]');
        var contributorsXML = '';
        for(i=0; i<elContributors.length; i++) {
            var roleXML = element('role', $(elContributors[i]).val());
            var nameXML = element('name', $(elContributors[i+1]).val());
            contributorsXML += element('contributor', roleXML+nameXML);
            i++; //Iterate two by two.
        }
        trackXML += element('contributors', contributorsXML);
        //TRACK TERRITORIES
        var elTerritories = $(item1).children('.territories').children('[type="text"]');
        var territoriesXML = '';
        for(i=0; i<elTerritories.length; i++) {
            var countryXML = element('country', $(elTerritories[i]).val());
            var labelXML = element('label', $(elTerritories[i+1]).val());
            territoriesXML += element('territory', countryXML+labelXML);
            i++; //Iterate two by two.
        }
        trackXML += element('territories', territoriesXML);
        tracksXML += element('track', trackXML);
    });
    tracksXML = element('tracks', tracksXML);
    var discXML = '';
    discXML += element('number', 1);
    discXML += element('track_count', $('#tracks').children().length);
    discXML += tracksXML;
    //NEED TO IMPLEMENT TRACK COUNT AND DISC NUMBER
    discXML = element('disc', discXML);
    var discsXML = element('discs', discXML);    
    
    var productXML = element('product', staticContentXML+contributorsXML+territoriesXML+discsXML);
    $('#overlay_inner').text(productXML);
}

function element(name,content) {
    var xml
    if (!content){
        xml='<' + name + '/>'
    }
    else {
        xml='<'+ name + '>' + content + '</' + name + '>'
    }
    return xml
}
