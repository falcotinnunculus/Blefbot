const Discord = require("discord.js");
const auth = require("./auth.json");
const client = new Discord.Client();
const Words = ["9gag"];
client.on("ready", () => {
 console.log("I am ready!");
});

/*client.on("message", (message) => {
 if (Words.some(word => message.content.includes(word))) {
 message.reply("Go away!");
 message.author.send("ONLY PICTURES.");
 message.delete();
 }
});*/
client.on('message', msg => {
        if (msg.content === '%ping') {
            msg.channel.send('Pong!');
        }
    });


client.on('message', message => {
	if (message.content.includes('%plus')) {
		p= message.content.split(" ");
		message.channel.send(parseInt(p[1])+parseInt(p[2]));
	}
});

var talia=[21,22,23,24,31,32,33,34,41,42,43,44,51,52,53,54,61,62,63,64,71,72,73,74,81,82,83,84,91,92,93,94,101,102,103,104,111,112,113,114,121,122,123,124,131,132,133,134,141,142,143,144];
var gracze=[]

function numbertocard(number){
	if(number<110) card=parseInt(number/10);
	else if(number<120) card="walet"
	else if(number<130) card="dama"
	else if(number<140) card="król"
	else if(number<150) card="as"
	
	if(number%10==1) card=card+" kier"
	else if(number%10==2) card=card+" karo"
	else if(number%10==3) card=card+" pik"
	else if(number%10==4) card=card+" trefl"
	
	return card;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
talia=shuffle(talia)

var ilosc_kart=[]

client.on('message', message => {
	if (message.content==='%gram') {
		if(!gracze.includes(message.author)){
			gracze.push(message.author);
			ilosc_kart.push(1);
			message.react("👍");
			
		}
		else{
			message.react("👎")
		}
	}
});

var ilosc_graczy=gracze.length;
var ilosc_kart=new Array(ilosc_graczy);
for(let i=0; i<gracze.length; i++){
	ilosc_kart[i]=1;
}

client.on('message', message => {
	if (message.content==='%ktogra') {
		message.channel.send(gracze);
		ilosc_graczy=gracze.length;
		message.channel.send("Ilość graczy: "+ilosc_graczy)
	}
});

client.on('message', message => {
	if (message.content.includes('%rozdaj_mi')) {
		message.author.send(talia[0]);
	}
});

client.on('message', message => {
	if (message.content==='%ilekart') {
		/*for(let j=0; j<gracze.length; j++){
			message.channel.send(gracze[j]);
			message.channel.send(ilosc_kart[j]);
		}*/
	message.channel.send(gracze)
	message.channel.send(ilosc_kart)
	}
});

var tempc;

client.on('message', message => {
	if (message.content ==='%rozdaj') {
		talia=shuffle(talia)
		tempc=0;
		for(let i=0; i<gracze.length; i++){
			var kartygracza=talia.slice(tempc,tempc+ilosc_kart[i]);
			kartygracza.sort();
			gracze[i].send("Twoje karty:")
			for(let j=0; j<ilosc_kart[i]; j++){
				gracze[i].send(numbertocard(kartygracza[j]));
				//gracze[i].send(talia[tempc]);
				tempc++;
			}
		}
	}
});

client.on('message', message => {
	if (message.content.includes('%dodaj')) {
		dod = message.content.split(" ");
		ilosc_kart[gracze.indexOf(dod[1])]++;
	}
});

client.on('message', message => {
	if (message.content === '%dajmi') {
		ilosc_kart[gracze.indexOf(message.author)]++;
		message.react("👍");
	}
});

client.on('message', message => {
	if (message.content ==='%sprawdzam') {
		//for(let i=0; i<tempc; i++){
			var kartywsz=talia.slice(0,tempc);
			kartywsz.sort();
			for(let j=0; j<tempc; j++){
				message.channel.send(numbertocard(kartywsz[j]));
			}
		//}
	}
});

client.on("ready", () => {
  client.user.setActivity("w Blefa");
})

client.on('message', message => {
	if (message.content.includes('%aktywny')) {
		message.user.setActivity("w Blefa");
		message.react("👍");
	}
});

client.on('message', msg => {
        if (msg.content === '%test') {
			const channel = msg.guilds.get("691354830387806298").channels.get('707911349954674718');
			channel.send('Test nie siupnął');

            msg.channel.send('Pong!');
        }
    });

client.on('message', message => {
	if (message.content.includes('%serwery')) {
		message.channel.send(message.guilds())
	}
});

client.login(auth.token);