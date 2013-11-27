$( document ).ready(function() {
    $('#main-title').fadeIn('slow', function(){
        $('#main-title').fadeOut('slow');
    });

    // Show Details
    $('.show-details').click(function(){
        $('#details').fadeIn('slow');
        $('#details .affinity-img p.text-left').html(user.name);
        $('#details .affinity-img p.text-right').html(currentFriend.name);
        $('#details .ch-zodiac-user').attr('src', 'Images/chineseSign/'+ user.chineseZodiac +'.png');
        $('#details .ch-zodiac-other').attr('src', 'Images/chineseSign/'+ currentFriend.chineseZodiac +'.png');
        $('#details .eu-zodiac-user').attr('src', 'Images/euroSign/'+ user.europeanZodiac +'.png');
        $('#details .eu-zodiac-other').attr('src', 'Images/euroSign/'+ currentFriend.europeanZodiac +'.png');
        

        ShowLoader();
        GetAndSetDescriptions('#details');


        // Hide Details
        $('#details .exit').click(function(){
            $('#details').fadeOut('slow');
        });
    });

    //Display Like Popup
    function DisplayLikePopUp(){
        $('#box-shadow').fadeIn('slow');
        $('#FanPagePromo').fadeIn('slow');
        FB.Event.subscribe('edge.create', function(response) {
            //Do stuff when the user just clicked a "like" button
            HideLikePopUp();
            DisplayCompleteView();
        });

        // Hide Like Popup
        $('#FanPagePromo .exit').click(function(){
            HideLikePopUp();
        });
        function HideLikePopUp(){
            $('#box-shadow').fadeOut('slow');
            $('#FanPagePromo').fadeOut('slow');
        }
    }

    //Display Complete View
    function DisplayCompleteView(){
        var friendListHtml = '';
        for(var i = 0; i < friendsToMatch.length; i++){
            friendListHtml += '<a id="'+ i +'" href="#">'+ friendsToMatch[i].name +': '+friendsToMatch[i].TotalAffinity +'</a>';
        }
        $('#completeView .friend-list').append(friendListHtml);
        $('.result').fadeOut('slow', function(){
            changeFriend(0);
            $('#completeView').fadeIn('slow');

            $('#completeView input#fb-friends-search').keyup(function (){
                var input = $('input#fb-friends-search').val().toLowerCase();
                for (var i = 0; i < friendsToMatch.length; i++) {
                    if(friendsToMatch[i].name.toLowerCase().indexOf(input) == -1) 
                        $('#completeView #'+ i ).css('display', 'none');
                    else
                        $('#completeView #'+ i ).css('display', 'block');
                }
            });

            $('#completeView .friend-list a').click(function(){
                var $this = $(this);
                $this.css('color', '#000000');
                var friendRank = $this.attr('id');
                changeFriend(friendRank);
                return false;
            });
            
            var checkFbLike = setInterval(function(){
                FB.api('/me/likes/410899022365306', {limit: 1}, function(r) { 
                    if (r.data.length == 0) {
                        //On propose de liker pour accéder à toutes les fonctionnalités de l'application
                        DisplayLikePopUp();
                        HideCompleteView();
                        clearInterval(checkFbLike);
                    } 
                }); 
            }, 15000);
        });

        function changeFriend(friendRank){
            currentFriend = friendsToMatch[friendRank];
            $('#completeView .details .texts').css('display', 'none');

            $('#completeView .other').fadeOut('slow', function(){
                $('#completeView .other').attr('id', friendsToMatch[friendRank].id);
                $('#completeView .other .name').text(friendsToMatch[friendRank].name);
                $('#completeView .other .picture').attr('src', 'http://graph.facebook.com/' + friendsToMatch[friendRank].id + '/picture');
                $('#completeView .other .astro').html(friendsToMatch[friendRank].europeanZodiac + '<br />' + friendsToMatch[friendRank].chineseZodiac);
                $('#completeView .details img.other').attr('src', 'http://graph.facebook.com/' + friendsToMatch[friendRank].id + '/picture');
                $('#completeView .details .astro-chine').html('' + user.chineseZodiac+ '<br />' +friendsToMatch[friendRank].chineseZodiac);
                $('#completeView .details .astro-europe').html('' + user.europeanZodiac+ '<br />' +friendsToMatch[friendRank].europeanZodiac);
                $('#completeView .ch-zodiac-user').attr('src', 'Images/chineseSign/'+ user.chineseZodiac +'.png');
                $('#completeView .ch-zodiac-other').attr('src', 'Images/chineseSign/'+ friendsToMatch[friendRank].chineseZodiac +'.png');
                $('#completeView .eu-zodiac-user').attr('src', 'Images/euroSign/'+ user.europeanZodiac +'.png');
                $('#completeView .eu-zodiac-other').attr('src', 'Images/euroSign/'+ friendsToMatch[friendRank].europeanZodiac +'.png');
                
                $('#completeView .other').fadeIn('slow');
            })
            $('#completeView .infos p.affinity').fadeOut('slow', function(){
                $('#completeView .infos p.affinity').text(friendsToMatch[friendRank].TotalAffinity);
                $('#completeView .infos p.affinity').fadeIn('slow');
            })

            ShowLoader();
            GetAndSetDescriptions('#completeView .details');

            // Show other kind of sign
            $('#completeView .details .next').click(function(){
                switchSignDesc('#completeView .details');
            });
        };

        //Hide Complete View
        $('#completeView .exit').click(function(){
            $('#completeView').fadeOut('slow', function(){
                $('.result').fadeIn('slow');
            });
        });
        
        function HideCompleteView(){
            $('#completeView').fadeOut('slow', function(){
                $('.result').fadeIn('slow');
            });
        }
    }

    $('#details .next').click(function(){
        switchSignDesc('#details');
    });

    function switchSignDesc(windowDiv){
        // Show other kind of sign
        if($(windowDiv +' .text-europe').css('display') == 'block' ){
            $(windowDiv +' .text-europe').fadeOut('slow', function(){
                $(windowDiv +' .text-chine').fadeIn('slow');
            });
            $(windowDiv +' .astro-europe').fadeOut('slow', function(){
                $(windowDiv +' .astro-chine').fadeIn('slow');
            });
            $(windowDiv +' .eu-zodiac-user').fadeOut('slow', function(){
                $(windowDiv +' .ch-zodiac-user').fadeIn('slow');
            });
            $(windowDiv +' .eu-zodiac-other').fadeOut('slow', function(){
                $(windowDiv +' .ch-zodiac-other').fadeIn('slow');
            });
        }
        else{
            $(windowDiv +' .text-chine').fadeOut('slow', function(){
                $(windowDiv +' .text-europe').fadeIn('slow');
            });
            $(windowDiv +' .astro-chine').fadeOut('slow', function(){
                $(windowDiv +' .astro-europe').fadeIn('slow');
            });
            $(windowDiv +' .ch-zodiac-user').fadeOut('slow', function(){
                $(windowDiv +' .eu-zodiac-user').fadeIn('slow');
            });
            $(windowDiv +' .ch-zodiac-other').fadeOut('slow', function(){
                $(windowDiv +' .eu-zodiac-other').fadeIn('slow');
            });
        }
    }

    function GetAndSetDescriptions(windowDiv){
        $.ajax({
            type: "POST",
            url: "display_descr.php",
            data: {id_descr: currentFriend.idEuroDescription}
            })
            .done(function(desc) {
                HideLoader();
                $(windowDiv+' .texts').css('display', 'block');
                $(windowDiv+' .text-europe').html(desc);
        });

        $.ajax({
            type: "POST",
            url: "display_descr.php",
            data: {id_descr: currentFriend.idChineseDescription}
            })
            .done(function(desc) {
                HideLoader();
                $(windowDiv+' .texts').css('display', 'block');
                $(windowDiv+' .text-chine').html(desc);
        });
    }



    //Voir tous les amis
    $('.see-all').click(function(){
        FB.api('/me/likes/410899022365306', {limit: 1}, function(r) { 
            if (r.data.length == 1) {
                DisplayCompleteView();
            } 
            else{
                //On propose de liker pour accéder à toutes les fonctionnalités de l'application
                DisplayLikePopUp();
                HideCompeteView();
            }
        }); 
    });
    
    function ShowLoader(){
        $('.loader').css('display', 'block');
    }
    function HideLoader(){
        $('.loader').css('display', 'none');
    }
    
    //Facebook share
    $('.share-result').click(function(){
        postFeedDialogToAnUser(currentFriend.id);
    });
    
    function postFeedDialogToAnUser(userId) {
        FB.ui({ method: 'feed',
            link: 'http://' + document.domain + '/',
            picture: 'http://'+ document.domain +'/Images/cupidon.png',
            to: userId,
            name: "My Social Match",
            description: 'Salut !,<center></center><center></center>Je viens de faire ce test d\'affinité.<center></center><center></center>Le résultat est surprenant ! <center></center>Viens le voir !'
        }, feedCallback);

		
    }
    function feedCallback(response){
        if (response && response.post_id) {
            $('.post-feed').css('display', 'block');
            setTimeout(function () {
                $('.post-feed').css('display', 'none');
            }, 3000);
        $.post('');
        }
    }
});