$( document ).ready(function() {
    // Facebook Login
    $('a.connect').click(function(){
        FB.login(function(response) {
            if (response.authResponse) {
                var access_token = FB.getAuthResponse()['accessToken'];
                console.log('Access Token = '+ access_token);
                GetMyInformations();
                GetFriendsInformations();
            }
            else {
                console.log('User cancelled login or did not fully authorize.');
            }
        },{scope: 'user_birthday, user_location, user_likes, friends_location, friends_birthday'});
    });
    
    function GetMyInformations(){
        // Récupération des données User
        FB.api('/me/', {fields: 'name,id,location,birthday,gender'}, function (response) {
            console.log(response);
            tempDate = new Date(response.birthday);
            user = {id: response.id, name: response.name, gender: response.gender, photoUrl: 'http://graph.facebook.com/' + response.id + '/picture', birthday: response.birthday, chineseZodiac: findChineseZodiac(tempDate), europeanZodiac: findEuropeanZodiac(tempDate)};

            $('.me .name').text(user.name);
            $('.me .picture').attr('src', user.photoUrl);
            $('.me .astro').html(user.europeanZodiac+ '<br />'+ user.chineseZodiac);

            $.ajax({
                type: "POST",
                url: "db_add_user.php",
                data: {id: user.id, birthdate: user.birthday}
                })
                .done(function(msg) {
                    console.log(msg);
            });
        });
    }

    function GetFriendsInformations(){

        // Récupération d'info d'ami
        FB.api('/me/friends', {fields: 'name,id,location,birthday,gender'}, function (response) {
            console.log(response);
            var data = response.data;
            for (var i = 0; i < data.length; i++) {
                if(HasBirthdate(data[i]) && !IsSameGender(data[i])){
                    tempDate = new Date(data[i].birthday);
                    friendsToMatch.push({id: data[i].id, name: data[i].name, photoUrl: 'http://graph.facebook.com/' + data[i].id + '/picture',birthday: tempDate, chineseZodiac: findChineseZodiac(tempDate), europeanZodiac: findEuropeanZodiac(tempDate), idEuroDescription: null, idChineseDescription: null});
                }
                else{
                    missingFriends.push({id: data[i].id, name: data[i].name, birthday: data[i].birthday});
                }
            }

            for(var i = 0; i < friendsToMatch.length; i++){
                CompareAffinity(friendsToMatch[i], euro5Stars, chinese5Stars, 5);
                CompareAffinity(friendsToMatch[i], euro4Stars, chinese4Stars, 4);
                CompareAffinity(friendsToMatch[i], euro3Stars, chinese3Stars, 3);
                CompareAffinity(friendsToMatch[i], euro2Stars, chinese2Stars, 2);
                CompareAffinity(friendsToMatch[i], euro1Star, chinese1Star, 1);

                CalculateTotalAffinity(friendsToMatch[i]);
            }

            friendsToMatch.sort(compareByAffinity);
            currentFriend = friendsToMatch[0];

            $('.other').attr('id', friendsToMatch[0].id);
            $('.other .name').text(friendsToMatch[0].name);
            $('.other .picture').attr('src', friendsToMatch[0].photoUrl);
            $('.other .astro').html(friendsToMatch[0].europeanZodiac+ '<br />'+ friendsToMatch[0].chineseZodiac);
            $('.affinity p').text(friendsToMatch[0].TotalAffinity);
            $('#details .astro-chine').html('' + user.chineseZodiac+ '<br />' +friendsToMatch[0].chineseZodiac);
            $('#details .astro-europe').html('' + user.europeanZodiac+ '<br />' +friendsToMatch[0].europeanZodiac);

            for(var i = 0; i < 10; i++){
                $('.see-all').before('<div id="'+ i +'" class="picture-menu"><a href="#" title="'+ friendsToMatch[i].TotalAffinity +'"><img src="'+ friendsToMatch[i].photoUrl +'" alt="'+ friendsToMatch[i].name +'" /></a><p class="hidden-affinity">'+ friendsToMatch[i].TotalAffinity+ '</p></div>');
            }
            $('.menu').append('<div class="clear"></div>');

            $('.infos img.me').attr('src', user.photoUrl);
            $('.infos .sign p').html(user.europeanZodiac+ '<br />' +friendsToMatch[0].europeanZodiac);
            $('.infos img.other').attr('src', friendsToMatch[0].photoUrl);
            $('.infos p.affinity').text(friendsToMatch[0].TotalAffinity);

            $('.intro').fadeOut('slow',function(){
                $('#content').css('width', '800px');
                $('.result').fadeIn('slow');
            });

            $('div.picture-menu').on('click', function(){
                var $this = $(this);
                var friendRank = $this.attr('id');
                currentFriend = friendsToMatch[friendRank];
                $('#details .texts').css('display', 'none');

                $('.other').fadeOut('slow', function(){
                    $('.other').attr('id', friendsToMatch[friendRank].id);
                    $('.other .name').text($this.children('a').children('img').attr('alt'));
                    $('.other .picture').attr('src', 'http://graph.facebook.com/' + friendsToMatch[friendRank].id + '/picture');
                    $('.other .astro').html(friendsToMatch[friendRank].europeanZodiac + '<br />' + friendsToMatch[friendRank].chineseZodiac);
                    $('#details img.other').attr('src', 'http://graph.facebook.com/' + friendsToMatch[friendRank].id + '/picture');
                    $('#details .astro-chine').html('' + user.chineseZodiac+ '<br />' +friendsToMatch[friendRank].chineseZodiac);
                    $('#details .astro-europe').html('' + user.europeanZodiac+ '<br />' +friendsToMatch[friendRank].europeanZodiac);
                    $('.other').fadeIn('slow');
                })
                $('.result .affinity *').fadeOut('slow', function(){
                    $('.result .affinity *').text($this.children('p.hidden-affinity').html());
                    $('.result .affinity *').fadeIn('slow');
                })
                $('.infos p.affinity').fadeOut('slow', function(){
                    $('.infos p.affinity').text($this.children('p.hidden-affinity').html());
                    $('.infos p.affinity').fadeIn('slow');
                })
                return false;
            });
        });
    }

    //Vérifie si l'ami a le même sexe
    function IsSameGender(friend){
        if(friend.gender == user.gender)
            return true;
        return false;
    }

    // Vérifie si l'ami a une date de naissance
    function HasBirthdate(friend){
        if(friend.birthday != null && HasYearInDate(friend.birthday))
            return true;
        return false;
    }

    // Vérifie si la date de naissance de l'ami a une année
    function HasYearInDate(date){
        if(date.length > 5 && new Date(Date.parse(date)).getFullYear() > 1911)
            return true;
        return false;
    }

    //Vérifie si l'ami est du sexe opposé
    function IsOppositeGender(friendGender){
        if(friendGender != user.gender)
            return true;
        return false;
    }

    // Recherche de l'affinité avec un ami
    // En fonction du rang courant, si le signe du zodiac (européen d'abord puis chinois dans l'autre condition)
    // de l'utilisateur et de l'ami est présent dans la liste d'affinité, on ajout le rang (1,2,3,4 ou 5)
    // dans un nouvel attribut europeanAffinity/chineseAffinity 
    function CompareAffinity(friend, europeanAffinityLevel, chineseAffinityLevel, AffinityRate){
        if(friend.europeanAffinity == null){
            for(var j = 0; j < europeanAffinityLevel.length; j ++){
                if((europeanAffinityLevel[j][0] == user.europeanZodiac && europeanAffinityLevel[j][1] == friend.europeanZodiac)
                || (europeanAffinityLevel[j][1] == user.europeanZodiac && europeanAffinityLevel[j][0] == friend.europeanZodiac)){
                    friend.EuropeanAffinity = AffinityRate;
                    friend.idEuroDescription = europeanAffinityLevel[j][2];
                }
            }
        }

        if(friend.chineseAffinity == null){
            for(var j = 0; j < chineseAffinityLevel.length; j ++){
                if((chineseAffinityLevel[j][0] == user.chineseZodiac && chineseAffinityLevel[j][1] == friend.chineseZodiac)
                || (chineseAffinityLevel[j][1] == user.chineseZodiac && chineseAffinityLevel[j][0] == friend.chineseZodiac)){
                    friend.ChineseAffinity = AffinityRate;
                    friend.idChineseDescription = chineseAffinityLevel[j][2];
                }
            } 
        }
    }

    // Calcule de la note finale d'affinité représenté sous forme de pourcentage
    // On effectue la moyenne des deux affinités sur 5 puis on la multiplie par 2 pour avoir un résultat sur 10
    // puis on multiplie le tout par 10 pour obtenir un pourcentage.
    // AstroPower utilise les astres pour affiner le résultat
    function CalculateTotalAffinity(friend){
        var total = ((friend.EuropeanAffinity + friend.ChineseAffinity) / 2) * 2 * 10;
        if(total == 100)
            total -= 1;
        var astroPower = Math.random() * (5 - (-5)) - 5;
        friend.TotalAffinity = Math.round(total + astroPower) +'%';
    }

    // Classement des résultats total d'affinité par ordre décroissant.
    function compareByAffinity(a,b) {
        if ((a.TotalAffinity) > (b.TotalAffinity))
            return -1;
        if ((a.TotalAffinity) < (b.TotalAffinity))
            return 1;
        return 0;
    }
});


