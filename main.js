const STATS=['Strength','Endurance','Dexterity','Wisdom','Intellect'];
const SKILLS={Nature:['Hunting','Gathering','Stone cutting'],Magic:['Enchantment','Reading','Medicine'],Culture:['Processing','Religion','Charisma'],Combat:['Fighting','Protection','Survival'],Builder:['Cooking','Masonry','Carpentry']};
const EMOJI={processed_iron:'⚙️',processed_copper:'🟤',wood:'🪵',flower:'🌸',grain:'🌾',stone_small:'🪨',stone_medium:'🪨',stone_large:'🪨',iron:'⛓️',copper:'🟠',antler:'🦌',deer_hide:'🦌',snake_skin:'🐍',venom:'🧪',croc_skin:'🐊',croc_heart:'❤️',wolf_fur:'🐺',wolf_tooth:'🦷',wolf_heart:'❤️',deer_heart:'❤️',food:'🍲'};
const NAMES={processed_iron:'Forarbejdet jern',processed_copper:'Forarbejdet kobber',wood:'Træ',flower:'Blomster',grain:'Korn',stone_small:'Små sten',stone_medium:'Mellem sten',stone_large:'Store sten',iron:'Jern',copper:'Kobber',antler:'Hjortegevir',deer_hide:'Hjortepels',snake_skin:'Slangeskind',venom:'Slangegift',croc_skin:'Krokodillelæder',croc_heart:'Krokodillehjerte',wolf_fur:'Ulvepels',wolf_tooth:'Ulvetænder',wolf_heart:'Ulvehjerte',deer_heart:'Hjortehjerte',food:'Mad'};
const RECIPES=[
{id:'wand',name:'Rough wooden wand',profession:'Weaponry',cost:{wood:3,antler:1},slot:'main',bonus:{Intellect:1}},
{id:'mace',name:'Rough stone mace',profession:'Weaponry',cost:{wood:3,stone_large:1},slot:'main',bonus:{Strength:1}},
{id:'boots',name:'Croc leather boots',profession:'Armor smithing',cost:{croc_skin:4},slot:'boots',bonus:{Survival:1}},
{id:'wolfchest',name:'Wolf pels (chest)',profession:'Armor smithing',cost:{wolf_fur:5},slot:'chest',bonus:{Nature:1}},
{id:'hpotion',name:'Health potion',profession:'Utility',cost:{flower:5,deer_heart:1},requires:['firepit'],effect:'Heal 20 HP'},
{id:'cpotion',name:'Charge potion',profession:'Utility',cost:{venom:1,flower:3,croc_heart:1},requires:['firepit'],effect:'+1 charge'},
{id:'firepit',name:'Firepit',profession:'Camper',cost:{stone_medium:12,stone_small:20},effect:'Camp upgrade'},
{id:'furnace',name:'Iron Furnace',profession:'Camper',cost:{stone_large:10},effect:'Camp upgrade'},
{id:'sawmill',name:'Sawmill',profession:'Camper',cost:{processed_iron:5,wood:10,stone_large:3},requires:['firepit','furnace'],effect:'Camp upgrade'},
{id:'toolstand',name:'Tool craft stand',profession:'Camper',level:5,cost:{wood:4,stone_small:4,processed_iron:4},effect:'Camp upgrade'},
{id:'stoneaxe',name:'Stone axe',profession:'Weaponry',level:10,requires:['toolstand'],cost:{wood:5,stone_medium:2},slot:'main',bonus:{damage:10}},
{id:'dagger',name:'Dagger',profession:'Weaponry',level:12,requires:['forge'],cost:{processed_iron:5,wood:2,processed_copper:1},slot:'main',bonus:{damage:12}},
{id:'naturewand',name:'Nature wand',profession:'Weaponry',cost:{antler:3,wood:2,wolf_tooth:2},slot:'main',bonus:{Wisdom:1,Intellect:1,HP:10},special:'Nature ≥15, Enchantment ≥10'},
{id:'shortsword',name:'Short sword',profession:'Weaponry',cost:{processed_iron:10,wood:2},slot:'main',bonus:{Strength:1,Wisdom:1},special:'Combat ≥15'},
{id:'longsword',name:'Long sword',profession:'Weaponry',level:20,cost:{processed_copper:10,wood:2},slot:'main',bonus:{Strength:3}},
{id:'chainlegs',name:'Chainmail legs',profession:'Armor smithing',level:20,cost:{processed_iron:10},slot:'legs',bonus:{AC:3}},
{id:'chainchest',name:'Chainmail chest',profession:'Armor smithing',level:15,cost:{processed_iron:12},slot:'chest',bonus:{AC:2,Strength:5}},
{id:'chainhelm',name:'Chainmail helmet',profession:'Armor smithing',level:25,cost:{processed_iron:4},slot:'head',bonus:{AC:4,Endurance:3}},
{id:'naturechest',name:'Nature chest',profession:'Armor smithing',level:15,cost:{wolf_fur:6},slot:'chest',bonus:{Intellect:2,Wisdom:2},special:'Nature ≥20'},
{id:'naturelegs',name:'Nature legs',profession:'Armor smithing',level:25,cost:{deer_hide:10},slot:'legs',bonus:{Endurance:2,Wisdom:2},special:'Nature ≥20'},
{id:'epicchest',name:'Epic chest',profession:'Armor smithing',level:25,cost:{wolf_fur:10,croc_skin:3},slot:'chest',bonus:{Wisdom:10,Intellect:10,Strength:10,Endurance:10},special:'Magic ≥20'},
{id:'naturehelm',name:'Nature helmet',profession:'Armor smithing',level:20,cost:{antler:10},slot:'head',bonus:{Wisdom:1,damage:10},special:'Nature ≥20'},
{id:'pulley',name:'Pulley system',profession:'Camper',level:15,requires:['forge'],cost:{wood:10,processed_iron:10},effect:'Camp upgrade'},
{id:'wall',name:'Stone wall',profession:'Camper',level:20,requires:['pulley'],cost:{stone_large:100},effect:'Camp upgrade'}
];
const PROCESSING=[{id:'iron',name:'Processed Iron',cost:{processed_iron:2},output:'processed_iron'},{id:'copper',name:'Processed Copper',cost:{processed_copper:2},output:'processed_copper'}];
const TALENTS={
Fighter:[
['Hamstring',[],1,'ability'],['Bleed',['Hamstring'],1,'ability'],['Improved hamstring',['Hamstring'],1,'passive'],
['Healing prayer',['Bleed','+1 Ability charge'],1,'ability'],['Regenerate',['Healing prayer','Power strike'],1,'ability'],
['+1 Ability charge',['Bleed','Improved hamstring'],1,'passive'],['+3 protection',['Improved hamstring'],3,'passive'],
['Power strike',['+1 Ability charge'],1,'ability'],['+1 strength',['Power strike'],3,'passive'],
['+10% all melee dmg',['+1 strength'],1,'passive'],['+1 Survival',['+3 protection'],3,'passive'],
['+1 endurance',['+1 Survival'],1,'passive'],['Reduce all dmg taken by 15%',['+1 endurance'],1,'passive']
],Caster:[
['Fireball',[],1,'ability'],['Ice wall',['Fireball'],1,'ability'],['Fire wall',['Fireball'],1,'ability'],
['Healing word',['Fireball'],1,'ability'],['Freeze',['Ice wall'],1,'ability'],['Fire shield',['Fire wall'],1,'ability'],
['Regenerate',['Healing word'],3,'ability'],['Thorns',['Freeze'],1,'ability'],['Fireball II',['Fire shield'],1,'passive'],
['Lifesteal',['Regenerate'],1,'passive'],['Improved thorns',['Thorns'],1,'passive'],
['Increase all dmg by 10%',['Improved thorns','+1 intellect'],1,'passive'],
['+1 intellect',['Fireball II'],3,'passive'],['Improved healing word',['Lifesteal'],1,'passive'],
['Increase healing by 25%',['Improved healing word'],1,'passive']
]};
const ENCOUNTERS=[
{type:'combat',kind:'wolf',name:'Ulv',icon:'🐺',hp:100,ac:20,dps:15},
{type:'combat',kind:'croc',name:'Krokodille',icon:'🐊',hp:200,ac:30,dps:12},
{type:'prey',kind:'deer',name:'Hjort',icon:'🦌'},
{type:'prey',kind:'snake',name:'Slange',icon:'🐍'},
{type:'gather',kind:'tree',name:'Træ',icon:'🌲',tier:1},
{type:'gather',kind:'flower',name:'Blomster',icon:'🌸',tier:1},
{type:'gather',kind:'mine',name:'Mine',icon:'⛏️',tier:1}
];

const KEY='dndgo_prototype_v1';
function newId(){return (globalThis.crypto && typeof crypto.randomUUID==='function')?crypto.randomUUID():'id-'+Date.now()+'-'+Math.random().toString(36).slice(2)}
const state={characters:[],active:null,screen:'select',tab:'character',campTab:'inventory',encounters:[],combat:null,selected:null,map:null,position:null};
function load(){try{let d=JSON.parse(localStorage.getItem(KEY)||'{}');state.characters=d.characters||[];state.active=state.characters.some(c=>c.id===d.active)?d.active:null;state.screen='select'}catch(e){console.error('Load failed',e)}}
function save(){try{localStorage.setItem(KEY,JSON.stringify({characters:state.characters,active:state.active}))}catch(e){console.warn('Kunne ikke gemme',e)}}
function hero(){return state.characters.find(c=>c.id===state.active)}
function createCharacter(name,cls){let c={id:newId(),name,cls,level:1,xp:0,statPoints:5,talentPoints:0,stats:Object.fromEntries(STATS.map(s=>[s,0])),hp:100,charges:0,skills:Object.fromEntries(Object.keys(SKILLS).map(s=>[s,{level:3,xp:0,points:0,sub:Object.fromEntries(SKILLS[s].map(k=>[k,1]))}])),professions:Object.fromEntries(['Weaponry','Armor smithing','Utility','Camper'].map(s=>[s,{level:0,xp:0}])),talents:{},prepared:[],inventory:{},campInventory:{},gold:0,gear:{main:{name:'Basic weapon',bonus:{},durability:100},head:{name:'Basic helmet',bonus:{},durability:100},chest:{name:'Basic chest',bonus:{},durability:100},legs:{name:'Basic legs',bonus:{},durability:100},boots:{name:'Basic boots',bonus:{},durability:100}},tools:{pickaxe:100,axe:100,knife:100},camp:[],campPosition:null,lastTime:Date.now(),debuffUntil:0};state.characters.push(c);state.active=c.id;save();return c}
function maxHP(c){return 100+(c.level-1)*5+(c.gear.main?.bonus?.HP||0)}
function stat(c,k){return (c.stats[k]||0)+Object.values(c.gear).reduce((s,g)=>s+(g?.bonus?.[k]||0),0)+(c.talents['+1 '+k.toLowerCase()]||0)}
function maxCharges(c){return c.level<2?0:3+(c.talents['+1 Ability charge']||0)+(c.camp.includes('wall')?1:0)}
function ac(c){return (c.cls==='Fighter'?20:10)+(c.level-1)*5+Object.values(c.gear).reduce((s,g)=>s+(g?.bonus?.AC||0),0)}
function addItem(c,k,n=1,where='inventory'){let bag=c[where];bag[k]=(bag[k]||0)+n;if(bag[k]<=0)delete bag[k];save()}
function count(c,k){return (c.inventory[k]||0)+(c.campInventory[k]||0)}
function consume(c,k,n){let a=Math.min(n,c.inventory[k]||0);addItem(c,k,-a);if(n>a)addItem(c,k,-(n-a),'campInventory')}
function xpNeeded(l){return Math.ceil(0.06*l*l+0.5*l+10)}
function characterXPNeeded(l){return 2*(xpNeeded(l)+25)}
function addXP(c,n){if(c.level>=10)return; c.xp+=n;while(c.level<10&&c.xp>=characterXPNeeded(c.level)){c.xp-=characterXPNeeded(c.level);c.level++;toast('✨ LEVEL UP! Level '+c.level+' · +5 HP · +5 AC');c.statPoints+=5;c.talentPoints++;c.hp=Math.min(maxHP(c),c.hp+5);if(c.level===2)c.charges=3}save()}
function skillXP(c,k,n){let s=c.skills[k];s.xp+=n;showSkillXP(k,n,s.xp,xpNeeded(s.level));while(s.level<25&&s.xp>=xpNeeded(s.level)){s.xp-=xpNeeded(s.level);s.level++;s.points++;toast(k+' Skill Level Up! Level '+s.level)}updateSkillXP(k,s.xp,xpNeeded(s.level));save()}
function professionXP(c,k,n=2){let p=c.professions[k];p.xp+=n;while(p.level<25&&p.xp>=xpNeeded(p.level)){p.xp-=xpNeeded(p.level);p.level++}save()}
function regen(){} // HP restored only by rest/healing

function generateEncounters(){
  const pos=state.position||[56.1629,10.2039];
  const level=Math.max(1,Math.min(12,hero()?.level||1));
  const combats=ENCOUNTERS.filter(e=>e.type==='combat');
  const others=ENCOUNTERS.filter(e=>e.type!=='combat');
  // Always spawn combat encounters; never below the hero's level or above 12.
  const pool=Array.from({length:14},(_,i)=>{
    const group=i<7?combats:others;
    const base=group[Math.floor(Math.random()*group.length)];
    const e={...base,id:newId()};
    e.level=e.type==='combat'?level+Math.floor(Math.random()*(13-level)):1+Math.floor(Math.random()*Math.min(4,level));
    e.tier=1+Math.floor(Math.random()*3);
    const angle=Math.random()*Math.PI*2, radius=.0003+Math.sqrt(Math.random())*.006;
    e.lat=pos[0]+Math.cos(angle)*radius;
    e.lng=pos[1]+Math.sin(angle)*radius;
    return e;
  });
  state.encounters=pool;
}

function removeEncounter(id){state.encounters=state.encounters.filter(e=>e.id!==id);save()}
function collect(e){let c=hero(),key=e.kind==='mine'?'Stone cutting':'Gathering';skillXP(c,'Nature',1);let level=c.skills.Nature.sub[key];let tier=e.tier||1;let chance=Math.min(.98,level*2/(tier===1?100:tier===2?150:200));let drops=[];let pool=e.kind==='mine'?[['stone_small',.4],['stone_medium',.4],['stone_large',.3],['iron',.2],['copper',.1]]:e.kind==='tree'?[['wood',.5]]:[['flower',.2],['grain',.15]];for(let [item,p] of pool){if(Math.random()<Math.max(chance,p+level*(e.kind==='mine'?.02:.01))){addItem(c,item);drops.push(item)}}if(drops.length)skillXP(c,'Nature',1);removeEncounter(e.id);addXP(c,2);return drops}
function hunt(e){let c=hero(),s=c.skills.Nature.sub.Hunting;let p=Math.min(1,8*s/(100+e.level));let success=Math.random()<p;if(success){skillXP(c,'Nature',2);addXP(c,5);let drops=[];let pool=e.kind==='deer'?[['antler',.2],['deer_hide',.2],['deer_heart',.12]]:[['snake_skin',.2],['venom',.2]];for(let [k,v] of pool)if(Math.random()<Math.min(1,v+1.4*s/100)){addItem(c,k);drops.push(k)}removeEncounter(e.id);return {success,drops}}skillXP(c,'Nature',1);return {success,drops:[]}}
function combatLoot(e){let c=hero(),s=c.skills.Nature.sub.Hunting,pool=e.kind==='wolf'?[['wolf_fur',.3],['wolf_tooth',.2],['wolf_heart',.12]]:[['croc_skin',.4],['croc_heart',.12]],drops=[];for(let [k,p] of pool)if(Math.random()<Math.min(1,p+1.5*s/100)){addItem(c,k);drops.push(k)}addXP(c,10*e.level);skillXP(c,'Combat',2);removeEncounter(e.id);return drops}

function startCombat(e){let bonus=e.level===1?0:1.5*e.level+10;state.combat={e,hp:Math.round(e.hp+bonus),max:Math.round(e.hp+bonus),dps:Math.round(e.dps+bonus),ac:Math.round(e.ac+bonus),turn:0,queued:null,log:['En '+e.name.toLowerCase()+' angriber!'],effects:[],enemyEffects:[],fleeFailed:false,brace:0,shield:0,heat:0};save()}
function queueAction(a){if(state.combat)state.combat.queued=a}
function tickCombat(){let b=state.combat,c=hero();if(!b)return null;b.turn++;let notes=[],act=b.queued|| (c.cls==='Fighter'?'Slå':'Wand');b.queued=null;
const damage=(v,ability=false)=>{let d=Math.max(1,Math.round(v));if(Math.random()*100<b.ac){notes.push('Modstanderen parer');return}b.hp=Math.max(0,b.hp-d);notes.push((ability?'✨ ':'⚔️ ')+d+' skade')};
const heal=(v)=>{let h=Math.min(maxHP(c)-c.hp,Math.round(v));c.hp+=h;notes.push('💚 +'+h+' HP')};
let strength=stat(c,'Strength'),intel=stat(c,'Intellect'),wis=stat(c,'Wisdom');
if(act==='Slå')damage(10+strength*c.level+(c.gear.main?.bonus?.damage||0));
else if(act==='Wand')damage(10+intel*c.level+(c.gear.main?.bonus?.damage||0));
else if(act==='Brace'){b.brace=strength;notes.push('🛡️ Brace aktiv')}
else if(act==='Heal')heal(.1*maxHP(c)+intel*c.level);
else if(act==='Flee'){let p=Math.min(.9,.2+stat(c,'Dexterity')*.03+c.skills.Combat.sub.Survival*.02);if(!b.fleeFailed&&Math.random()<p){c.hp=Math.max(1,Math.floor(c.hp*.8));state.combat=null;notes.push('Flygtede! Mistede 20% HP');save();return notes}b.fleeFailed=true;notes.push('Flugt mislykkedes')}
else if(c.prepared.includes(act)&&c.charges>0){c.charges--;skillXP(c,'Magic',1);
switch(act){
case 'Hamstring':damage(2*c.level*strength,true);b.shield=3;break;
case 'Bleed':b.enemyEffects.push({name:'Bleed',left:8,damage:strength*c.level});break;
case 'Healing prayer':heal(.17*maxHP(c));break;
case 'Regenerate':b.effects.push({name:'Regenerate',left:6,heal:maxHP(c)*.05});break;
case 'Power strike':damage(4*strength*c.level,true);break;
case 'Fireball':damage(3*c.level*intel+wis,true);break;
case 'Ice wall':b.brace=ac(c)*.5;break;
case 'Fire wall':b.shield=2;break;
case 'Freeze':damage(intel*c.level,true);b.shield=2;break;
case 'Fire shield':b.effects.push({name:'Fire shield',left:4});break;
case 'Healing word':heal(maxHP(c)*(c.talents['Improved healing word']?.35:.15));break;
case 'Thorns':b.effects.push({name:'Thorns',left:c.talents['Improved thorns']?8:5});break;
default:notes.push(act+' aktiveret');
}}
else notes.push('Ingen charges / ikke prepared');

for(let ef of b.effects){if(ef.heal)heal(ef.heal);ef.left--}b.effects=b.effects.filter(x=>x.left>0);
if(b.hp<=0){let drops=combatLoot(b.e);notes.push('🏆 Sejr! Loot: '+(drops.join(', ')||'intet'));state.combat=null;save();return notes}
let blocked=b.shield>0;b.shield=Math.max(0,b.shield-1);
if(!blocked&&Math.random()*100>=Math.min(90,ac(c)+b.brace+stat(c,'Dexterity'))){let dmg=Math.round(b.dps*(b.e.kind==='wolf'&&Math.random()<.2?1.4:1));if(c.talents['Reduce all dmg taken by 15%'])dmg=Math.round(dmg*.85);c.hp=Math.max(0,c.hp-dmg);notes.push('💔 -'+dmg+' HP');if(b.effects.some(x=>x.name==='Thorns'))damage(dmg*.3,true)}
else notes.push(blocked?'🛡️ Angreb blokeret':'🛡️ Pareret / undveget');
if(c.hp<=0){c.inventory={};c.debuffUntil=Date.now()+3600000;c.hp=1;notes.push('☠️ Besejret: inventory tabt, 1 times debuff');state.combat=null}
b.brace=0;if(state.combat)state.combat.log.unshift(...notes);save();return notes}

function showCombatNumbers(notes){
 if(!notes||!notes.length)return;
 const host=document.querySelector('.app');if(!host)return;
 const enemy=document.querySelector('[data-combat-target="enemy"]');
 const player=document.querySelector('[data-combat-target="player"]');
 for(const note of notes){
  const str=String(note);
  let target=/(💔|parer|blocks|miss|undviger|healer|heal|restores)/i.test(str)?player:enemy;
  if(/parer|miss|blocks/i.test(str))target=enemy;
  if(!target)continue;
  const n=document.createElement('div');n.className='floating combat-number';n.textContent=str;
  const a=target.getBoundingClientRect(),h=host.getBoundingClientRect();
  n.style.left=Math.max(12,a.left-h.left+a.width/2-60)+'px';
  n.style.top=Math.max(10,a.top-h.top+32)+'px';
  n.style.color=/(💔|skade|Bleed)/i.test(str)?'#ff8585':/(heal|restores|healer)/i.test(str)?'#83e9a6':'#f9d586';
  host.appendChild(n);setTimeout(()=>n.remove(),1300);
 }
}
function tickPassive(){let b=state.combat;if(!b)return null;let notes=[];for(let ef of b.enemyEffects){if(ef.name==='Bleed'){let d=Math.max(1,Math.round(ef.damage));b.hp=Math.max(0,b.hp-d);notes.push('🩸 Bleed -'+d+' HP')}ef.left--}b.enemyEffects=b.enemyEffects.filter(x=>x.left>0);if(b.hp<=0){let drops=combatLoot(b.e);notes.push('🏆 Sejr! Loot: '+(drops.join(', ')||'intet'));state.combat=null}if(state.combat)state.combat.log.unshift(...notes);save();return notes.length?notes:null}

function craft(r){let c=hero(),p=c.professions[r.profession];if((r.level||0)>p.level)return 'Profession level for lavt';if(r.requires?.some(x=>!c.camp.includes(x)))return 'Mangler camp upgrade';if(Object.entries(r.cost).some(([k,v])=>count(c,k)<v))return 'Mangler materialer';for(let [k,v] of Object.entries(r.cost))consume(c,k,v);professionXP(c,r.profession);if(r.slot){c.ownedGear=c.ownedGear||[];c.ownedGear.push({id:newId(),slot:r.slot,name:r.name,bonus:r.bonus||{},durability:100})}else if(r.profession==='Camper'){if(!c.camp.includes(r.id))c.camp.push(r.id)}else if(r.id==='hpotion')c.hp=Math.min(maxHP(c),c.hp+20);else if(r.id==='cpotion')c.charges++;save();return 'Crafted: '+r.name+(r.slot?' · Find it under Character → Gear':'')}
function knownRecipe(c,r){return (r.level||0)===0 || (c.knownRecipes||[]).includes(r.id)}
function processingView(){let c=hero();return `<h3>⚙️ Processing</h3><p class="muted">2 råmaterialer giver 1 forarbejdet materiale og 2 XP til Culture → Processing.</p>${PROCESSING.map(r=>{const material=Object.keys(r.cost)[0],required=r.cost[material],owned=count(c,material),ready=owned>=required;return `<div class="card"><div class="row"><b>${esc(r.name)}</b><button class="btn ${ready?'primary':''} small" data-action="process:${r.id}" ${ready?'':'disabled aria-disabled="true"'}>${ready?'Process':'Mangler materialer'}</button></div><p class="${ready?'':'muted'}">${NAMES[material]||material}: <strong>${owned} / ${required}</strong> → 1 × ${NAMES[r.output]||r.output}</p></div>`}).join('')}`}

function skillDescriptions(k,sub){let d={Hunting:'Jagt på hjort og slange. Få XP ved jagtforsøg; succes giver ekstra XP. Øger sandsynligheden for at fange bytte.',Gathering:'Samler træ, blomster og andre naturressourcer. Få XP ved gathering.', 'Stone cutting':'Udvinder sten og metal fra miner. Få XP ved mining.',Processing:'Forarbejd råjern og råkobber i Camp. Få 2 XP til Processing for hver vellykket forarbejdning.',Fighting:'Kamprelateret underfærdighed. Combat giver XP til hovedskillen Combat.',Protection:'Beskyttelsesfærdighed under Combat. Combat giver XP til hovedskillen Combat.',Survival:'Overlevelsesfærdighed under Combat. Combat giver XP til hovedskillen Combat.'};return d[sub]||sub+' er en underfærdighed under '+k+'. Der er endnu ikke defineret en separat XP-kilde i prototypen; XP optjenes i hovedskillen gennem relevante handlinger.'}
function infoModal(title,body,actions=''){document.querySelector('#info-overlay')?.remove();let el=document.createElement('div');el.id='info-overlay';el.className='overlay';el.innerHTML=`<div class="modal"><div class="row"><h2>${esc(title)}</h2>${btn('✕','closeInfo','small')}</div><p>${body}</p>${actions}</div>`;document.body.appendChild(el)}
function talentDetails(name){let c=hero(),t=TALENTS[c.cls].find(t=>t[0]===name);if(!t)return;let [nm,req,max,type]=t,n=c.talents[name]||0,ok=req.length===0||req.some(x=>c.talents[x]);let descriptions={'Hamstring':'Skade: 2 × Strength × character level. Reducerer skaden fra de næste 3 fjendtlige angreb.','Bleed':'Skade: Strength × character level hvert 0,5 sekund i 4 sekunder.','Improved hamstring':'Hamstring-skade ×1,5; skadereduktionen varer 4 angreb.','Healing prayer':'Healer 17 % af maksimal HP.','Power strike':'Skade: 4 × Strength × character level.','Regenerate':c.cls==='Fighter'?'Gendanner 30 % af maksimal HP over 6 sekunder.':'Gendanner op til 50 % af maksimal HP over 30 sekunder, afhængigt af talentniveau.','Fireball':'Skade: 3 × character level × Intellect + Wisdom.','Fire wall':'Fjenden kan ikke ramme i 2 sekunder.','Ice wall':'Øger AC med 50 %.','Freeze':'Skade: Intellect × character level. Fryser fjenden i 2 sekunder.','Healing word':'Healer 15 % af maksimal HP.','Thorns':'Reflekterer 30 % af modstanderens skade i 5 sekunder.','Fire shield':'Varer 4 sekunder. Hvert modtaget slag øger næste Fireball med 5 %.','Improved healing word':'Healing word healer nu 35 % af maksimal HP.'};infoModal(name,`<b>${type==='ability'?'Ability':'Passive talent'}</b><p>${descriptions[name]||'Talentets præcise effekt er endnu ikke beskrevet i MD-specifikationen.'}</p><p>Kræver: ${req.join(' eller ')||'Intet'} · Niveau ${n}/${max} · Talent points: ${c.talentPoints}</p>`,btn('Learn talent','talent:'+name,ok&&n<max&&c.talentPoints?'primary':''))}
function skillsView(){let c=hero();return `<h2>Skills</h2>${Object.entries(c.skills).map(([k,s])=>`<div class="card"><div class="row"><b>${k} · Lv ${s.level}</b>${btn('ⓘ','skillinfo:'+k,'small')}</div><div class="muted">XP ${s.xp}/${xpNeeded(s.level)} · ${s.points} available points</div>${meter(s.xp,xpNeeded(s.level))}${Object.entries(s.sub).map(([sub,n])=>`<div class="row gearline"><span>${esc(sub)} · Lv ${n}</span><span>${btn('ⓘ','skillinfo:'+k+':'+sub,'small')}${btn('+','sub:'+k+':'+sub,'small')}</span></div>`).join('')}</div>`).join('')}`}
function gearView(){let c=hero();return `<h2>Gear</h2><div class="card"><b>Samlede karakterstats</b><p>HP ${maxHP(c)} · AC ${ac(c)}</p><p>${STATS.map(k=>`${k}: ${stat(c,k)}`).join(' · ')}</p></div><h3>Equipped</h3>${Object.entries(c.gear).map(([slot,g])=>`<div class="encounter"><div class="details"><b>${slot}: ${esc(g?.name||'Empty')}</b><small>${Object.entries(g?.bonus||{}).map(([k,v])=>`${k} +${v}`).join(' · ')||'No bonuses'}</small></div>${btn('ⓘ','gearinfo:equipped:'+slot,'small')}${btn('Unequip','unequip:'+slot,'small')}</div>`).join('')}<h3>Owned gear</h3>${(c.ownedGear||[]).map(g=>`<div class="encounter"><div class="details"><b>${esc(g.name)}</b><small>${Object.entries(g.bonus||{}).map(([k,v])=>`${k} +${v}`).join(' · ')||'No bonuses'}</small></div>${btn('ⓘ','gearinfo:owned:'+g.id,'small')}${btn('Equip','equip:'+g.id,'small primary')}</div>`).join('')||'<p class="muted">Craft gear to add it here. Crafting does not auto-equip.</p>'}`}
function canCraft(r){let c=hero();return c.professions[r.profession].level>=(r.level||0)&&!r.requires?.some(x=>!c.camp.includes(x))&&Object.entries(r.cost).every(([k,v])=>count(c,k)>=v)}

const app=document.querySelector('#app');
function showSkillXP(name,gain,xp,needed){
 let root=document.getElementById('skill-xp-notices');
 if(!root){root=document.createElement('div');root.id='skill-xp-notices';document.body.appendChild(root)}
 let id='skillxp-'+String(name).replace(/[^a-z0-9]/gi,'');
 let el=document.getElementById(id);
 if(!el){el=document.createElement('div');el.id=id;el.className='skill-xp-popup';root.appendChild(el)}
 clearTimeout(el.hideTimer);
 el.innerHTML='<div class="skill-xp-title">'+esc(name)+' Skill <span class="skill-xp-fly">+'+Number(gain)+' XP</span></div><div class="skill-xp-track"><div class="skill-xp-fill" style="width:'+Math.min(100,100*xp/Math.max(1,needed))+'%"></div></div><small class="skill-xp-count">'+xp+' / '+needed+' XP</small>';
 el.classList.remove('skill-xp-active');
 void el.offsetWidth;
 el.classList.add('skill-xp-active');
 el.hideTimer=setTimeout(()=>{el.classList.remove('skill-xp-active');setTimeout(()=>el.remove(),400)},2500);
}
function updateSkillXP(name,xp,needed){
 const el=document.getElementById('skillxp-'+String(name).replace(/[^a-z0-9]/gi,''));
 if(!el)return;
 const bar=el.querySelector('.skill-xp-fill'),counter=el.querySelector('.skill-xp-count');
 if(bar)bar.style.width=Math.min(100,100*xp/Math.max(1,needed))+'%';
 if(counter)counter.textContent=xp+' / '+needed+' XP';
}
function toast(msg){let t=document.querySelector('#toast');t.textContent=msg;t.style.cssText='position:fixed;top:16px;left:50%;transform:translateX(-50%);background:#d9ad66;color:#142222;padding:13px 20px;border-radius:10px;z-index:2000;max-width:90%;text-align:center';clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.style.cssText='',2600)}
const btn=(text,action,cls='')=>`<button class="btn ${cls}" data-action="${action}">${text}</button>`;
const meter=(val,max)=>{let p=Math.max(0,Math.min(100,100*val/(max||1)));return `<div class="meter"><div class="${p<25?'hp-low '+(p<10?'hp-critical':''):p<50?'hp-mid':'hp-high'}" style="width:${p}%"></div></div>`};
const header=()=>`<header class="top"><div><div class="logo">⚔ DNDGO</div><div class="sub">THE WANDERING REALMS · PROTOTYPE</div></div><button class="btn small" data-action="switchHero" title="Choose character">⇄ ${hero()?.name||'Choose hero'}</button></header>`;
const nav=()=>`<nav class="bottom">${[['map','🗺️','Explore'],['character','🧙','Character'],['camp','⛺','Camp']].map(([k,i,t])=>`<button data-action="screen:${k}" class="${state.screen===k?'active':''}"><span>${i}</span>${t}</button>`).join('')}</nav>`;
function render(){let c=hero();if(!c||state.screen==='select'||state.screen==='create'){app.innerHTML=`<div class="app">${header()}${state.screen==='create'?creation():selection()}</div>`;return}app.innerHTML=`<div class="app">${header()}<main class="content">${state.screen==='map'?mapView():state.screen==='character'?characterView():state.screen==='camp'?campView():state.screen==='inventory'?inventoryView():state.screen==='encounter'?encounterView():state.screen==='combat'?combatView():mapView()}</main>${nav()}</div>`;if(state.screen==='map')setTimeout(drawMap,0)}
function selection(){return `<div class="onboard"><div class="hero"><div class="avatar">🏰</div><h1>THE WANDERING REALMS</h1><p class="muted">Explore your world. Become a legend.</p></div><h2 style="margin-top:25px">Choose your hero</h2>${state.characters.map(c=>`<div class="encounter" data-action="choose:${c.id}"><div class="icon">${c.cls==='Fighter'?'🛡️':'🧙'}</div><div class="details"><b>${esc(c.name)}</b><small>Level ${c.level} · ${c.cls}</small></div><span>❯</span></div>`).join('')}${btn('✦ Create new character','create','primary')}<p class="muted">Characters are saved locally in this browser.</p></div>`}
function creation(){return `<div class="onboard"><h2>Create your character</h2><div class="hero"><div class="avatar" id="preview">🛡️</div><div class="fantasy" id="preview-name">Fighter</div></div><div class="grid2" style="margin-top:14px">${btn('⚔ Fighter','class:Fighter','selected')}${btn('🔮 Caster','class:Caster')}</div><h3>Character name</h3><input id="hero-name" maxlength="24" placeholder="Enter name"><div class="spacer"></div>${btn('🎲 Random name','random')}<div class="spacer"></div><div class="grid2">${btn('Cancel','cancel')}${btn('Begin adventure','make','primary')}</div></div>`}
function mapView(){let c=hero();return `<div class="row"><div><h2>Explore the realm</h2><div class="muted">Level ${c.level} ${c.cls} · ${Math.round(c.hp)}/${maxHP(c)} HP</div></div>${btn('🎒 Bag','screen:inventory','small')}</div><div class="mapbox" id="map"></div><div class="row" style="margin-top:12px">${btn('📍 My location','locate','small')}${btn('↻ Find encounters','refresh','small')}${btn('⛺ Camp','openCamp','small')}</div><p class="muted">${c.campPosition?'Tap the tent marker to open your camp.':'First, tap the map to place your camp.'}</p><p class="muted">Encounters spawn near your position. GPS requires HTTPS or localhost. Demo mode works without GPS.</p><h3>Nearby encounters</h3>${state.encounters.filter(e=>e.type!=='combat'||e.level>=c.level).map(e=>`<div class="encounter" data-action="open:${e.id}"><div class="icon">${e.icon}</div><div class="details"><b>${e.name}</b><small>${e.type==='combat'?'Combat':e.type==='prey'?'Hunting':'Gathering'} · Level ${e.level||e.tier}</small></div><span>❯</span></div>`).join('')}`}
let mapObj=null,markers=[];
function drawMap(){let el=document.querySelector('#map');if(!el)return;if(mapObj){mapObj.remove();mapObj=null}if(typeof L==='undefined'){el.innerHTML='<div class="center" style="padding:90px 15px">Map tiles require an internet connection.<br>Encounters are available below.</div>';return}let p=state.position||[56.1629,10.2039];mapObj=L.map(el,{zoomControl:false}).setView(p,15);L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap contributors',maxZoom:19}).addTo(mapObj);L.marker(p,{icon:L.divIcon({className:'marker',html:'🧍',iconSize:[32,32]})}).addTo(mapObj).bindPopup('You are here (or demo location)');let c=hero();if(c?.campPosition){let tent=L.marker(c.campPosition,{icon:L.divIcon({className:'marker',html:'⛺',iconSize:[36,36]})}).addTo(mapObj);tent.on('click',()=>{state.screen='camp';render()});tent.bindPopup('Your camp')}else{mapObj.on('click',ev=>{c.campPosition=[ev.latlng.lat,ev.latlng.lng];save();toast('Camp placed! Tap the tent to enter.');render()})}for(let e of state.encounters.filter(e=>e.type!=='combat'||e.level>=c.level)){let m=L.marker([e.lat,e.lng],{icon:L.divIcon({className:'marker',html:e.icon+(e.type==='combat'?'<small style="font-size:12px;background:#13282b;color:#fff">Lv '+e.level+'</small>':''),iconSize:[32,32]})}).addTo(mapObj);m.on('click',()=>{state.selected=e.id;state.screen='encounter';render()})}setTimeout(()=>mapObj.invalidateSize(),200)}
function characterView(){let c=hero();return `<h2>Character development</h2><div class="tabs">${[['character','Character'],['skills','Skills'],['gear','Gear'],['talents','Talents'],['abilities','Abilities'],['craft','Craft']].map(([k,t])=>btn(t,'tab:'+k,state.tab===k?'selected':'' )).join('')}</div>${state.tab==='character'?characterSheet():state.tab==='skills'?skillsView():state.tab==='gear'?gearView():state.tab==='talents'?talentsView():state.tab==='abilities'?abilitiesView():craftList(false)}`}
function characterSheet(){let c=hero();return `<div class="hero compact-hero"><div class="avatar mini">${c.cls==='Fighter'?'🛡️':'🧙‍♂️'}</div><h2>${esc(c.name)} · Lv ${c.level}</h2><div class="pill">${c.cls}</div></div><div class="card"><div class="meterlabel"><span>❤️ HP</span><b>${Math.round(c.hp)}/${maxHP(c)}</b></div>${meter(c.hp,maxHP(c))}<div class="meterlabel"><span>✨ XP</span><b>${c.xp}/${characterXPNeeded(c.level)}</b></div>${meter(c.xp,characterXPNeeded(c.level))}<p>AC ${ac(c)} · Charges ${c.charges}/${maxCharges(c)}</p></div><h3>Attributes · ${c.statPoints} points</h3><div class="grid2">${STATS.map(k=>`<div class="stat"><div class="row"><b>${k}</b>${btn('ⓘ','statinfo:'+k,'small')}</div><div class="row"><strong>${stat(c,k)}</strong>${btn('+','stat:'+k,'small')}</div></div>`).join('')}</div>${btn('View equipped gear & total stats','tab:gear','primary')}`}
function talentsView(){
 let c=hero(),tal=TALENTS[c.cls];
 // Positions follow the two Mermaid diagrams in Prototype(1).md.
 // All prerequisite links are drawn individually, including converging branches.
 const layouts={
 Fighter:{
 'Hamstring':[380,40],'Bleed':[225,145],'Improved hamstring':[545,145],
 'Healing prayer':[165,330],'Regenerate':[180,600],'+1 Ability charge':[380,275],
 '+3 protection':[650,275],'Power strike':[380,405],'+1 strength':[380,510],
 '+10% all melee dmg':[380,615],'+1 Survival':[650,385],
 '+1 endurance':[650,495],'Reduce all dmg taken by 15%':[650,605]},
 Caster:{
 'Fireball':[380,40],'Ice wall':[120,150],'Fire wall':[380,150],
 'Healing word':[640,150],'Freeze':[120,260],'Fire shield':[380,260],
 'Regenerate':[640,260],'Thorns':[120,370],'Fireball II':[380,370],
 'Lifesteal':[640,370],'Improved thorns':[120,480],
 '+1 intellect':[380,480],'Improved healing word':[640,480],
 'Increase all dmg by 10%':[245,600],'Increase healing by 25%':[640,600]}};
 let coords=layouts[c.cls],edges=[];
 for(let [name,req] of tal){for(let parent of req){if(coords[parent]&&coords[name])edges.push([parent,name]);}}
 const width=760,height=710;
 const lines=edges.map(([a,b])=>{let [x1,y1]=coords[a],[x2,y2]=coords[b];return `<path d="M${x1} ${y1+28} C${x1} ${(y1+y2)/2},${x2} ${(y1+y2)/2},${x2} ${y2-28}" fill="none" stroke="#d6ad67" stroke-width="2.5" opacity=".75"/>`;}).join('');
 const nodes=tal.map(([name,req,cap,type])=>{let [x,y]=coords[name]||[380,660],n=c.talents[name]||0,ok=!req.length||req.some(k=>c.talents[k]);return `<button class="tree-node ${n?'unlocked':ok?'ready':'locked'}" style="position:absolute;left:${x}px;top:${y}px;transform:translate(-50%,-50%);width:126px;max-width:none;min-height:66px;z-index:1" data-action="talentinfo:${name}"><span>${type==='ability'?'✨':'✦'}</span><small>${esc(name)}${cap>1?' ('+n+'/'+cap+')':''}</small></button>`}).join('');
 return `<div class="notice">Talent points: ${c.talentPoints}. Tryk på et talent for at se effekten.</div><div class="tree-scroll" style="overflow:auto;max-height:calc(100dvh - 240px);touch-action:pan-x pan-y"><div style="position:relative;width:${width}px;height:${height}px;margin:0 auto"><svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="position:absolute;inset:0;pointer-events:none" aria-hidden="true">${lines}</svg>${nodes}</div></div>`;
}
function abilitiesView(){let c=hero();return `<div class="notice">Abilities unlock through talents. Prepare up to 5 abilities at camp. Each use costs 1 charge.</div><h3>Prepared · ${c.prepared.length}/5</h3><div class="card">${c.prepared.map(x=>`<p>✨ ${x}</p>`).join('')||'None prepared'}<p>Charges: ${c.charges}/${maxCharges(c)}</p></div><h3>Unlocked abilities</h3>${TALENTS[c.cls].filter(t=>t[3]==='ability'&&c.talents[t[0]]).map(t=>`<div class="encounter"><span>✨</span><b>${t[0]}</b></div>`).join('')||'<p class="muted">Spend talent points to unlock abilities.</p>'}`}
function inventoryView(){let c=hero(),entries=Object.entries(c.inventory).flatMap(([k,n])=>Array.from({length:Math.min(n,25)},()=>k)).slice(0,25);return `<div class="row"><h2>Inventory</h2>${btn('← Map','screen:map','small')}</div><div class="card"><div class="inventory">${Array.from({length:25},(_,i)=>`<div class="slot">${entries[i]?`<b>${EMOJI[entries[i]]||'📦'}</b>${NAMES[entries[i]]||entries[i]}`:'·'}</div>`).join('')}</div><p>🪙 ${c.gold} gold · ${Object.values(c.inventory).reduce((a,b)=>a+b,0)} items</p></div><div class="card">${Object.entries(c.inventory).map(([k,n])=>`<div class="row gearline"><span>${EMOJI[k]||'📦'} ${NAMES[k]||k}</span><b>×${n}</b></div>`).join('')||'<p class="muted">Your bag is empty.</p>'}</div>`}
function encounterView(){let e=state.encounters.find(x=>x.id===state.selected);if(!e){state.screen='map';return mapView()}return `<div class="row"><h2>${e.name}</h2>${btn('✕ Leave','screen:map','small')}</div><div class="hero"><div class="avatar">${e.icon}</div><h3>${e.name} · Level ${e.level}</h3><div class="pill">${e.type==='combat'?'Hostile encounter':e.type==='prey'?'Prey':'Resource · Tier '+e.tier}</div></div><div class="card">${e.type==='combat'?`<p>HP ${Math.round(e.hp+(e.level===1?0:1.5*e.level+10))} · AC ${e.ac} · Damage ${e.dps}/sec</p>${btn('⚔ Enter combat','fight','primary')}`:e.type==='prey'?`<p>Three attempts to hunt. Chance: 8 × Hunting skill / (100 + prey level).</p><p id="attempts">Attempts remaining: ${window.huntAttempts??3}</p>${btn('🏹 Hunt','hunt','primary')}`:`<p>Gather from this resource. Success is not guaranteed; better skill improves loot.</p>${btn(e.kind==='mine'?'⛏ Mine':e.kind==='tree'?'🪓 Chop':'🌿 Pick','collect','primary')}`}</div>`}
function combatView(){let b=state.combat,c=hero();if(!b){state.screen='map';return mapView()}let basics=c.cls==='Fighter'?['Slå','Brace']:['Wand','Heal'];return `<div class="row"><h2>⚔ Combat</h2><span class="pill">Round ${b.turn}</span></div><div class="hero" data-combat-target="enemy"><div class="avatar">${b.e.icon}</div><h3>${b.e.name} · Lv ${b.e.level}</h3><div class="meterlabel"><span>Enemy HP</span><b>${Math.round(b.hp)}/${b.max}</b></div>${meter(b.hp,b.max)}</div><div class="card" data-combat-target="player"><div class="row"><span class="avatar mini">${c.cls==='Fighter'?'🛡️':'🧙‍♂️'}</span><div style="flex:1"><b>${esc(c.name)}</b><div class="meterlabel"><span>HP</span><b>${Math.round(c.hp)}/${maxHP(c)}</b></div>${meter(c.hp,maxHP(c))}</div></div><p>✨ Charges ${c.charges}/${maxCharges(c)} · Queued: <b>${b.queued||'Basic attack'}</b></p><div class="grid2">${basics.map(x=>btn(x,'action:'+x)).join('')}${c.prepared.map(x=>btn('✨ '+x,'action:'+x,c.charges<1?'':'primary')).join('')}${btn('🏃 Flee','action:Flee','danger')}</div></div>`}
function campView(){let c=hero();return `<div class="row"><h2>⛺ Your camp</h2><span class="pill">${c.camp.length} upgrades</span></div><div class="hero"><div class="avatar">🏕️</div><div class="muted">A place to rest, prepare and craft.</div></div><div class="card"><div class="row"><div><b>Rest</b><p class="muted">20 seconds · Restore HP and charges</p></div>${btn(window.resting?'Resting…':'💤 Rest','rest','primary')}</div><div id="rest-progress" class="muted"></div></div><div class="tabs">${[['inventory','Storage'],['abilities','Prepare'],['craft','Crafting']].map(([k,t])=>btn(t,'camptab:'+k,state.campTab===k?'selected':'' )).join('')}</div>${state.campTab==='inventory'?campInventory():state.campTab==='abilities'?prepareView():craftList(true)}`}
function campInventory(){let c=hero();return `<h3>Backpack → Camp</h3>${Object.entries(c.inventory).map(([k,n])=>`<div class="encounter"><span>${EMOJI[k]||'📦'}</span><div class="details">${NAMES[k]||k} ×${n}</div>${btn('Store 1','move:inventory:'+k,'small')}</div>`).join('')||'<p class="muted">Empty</p>'}<h3>Camp → Backpack</h3>${Object.entries(c.campInventory).map(([k,n])=>`<div class="encounter"><span>${EMOJI[k]||'📦'}</span><div class="details">${NAMES[k]||k} ×${n}</div>${btn('Take 1','move:campInventory:'+k,'small')}</div>`).join('')||'<p class="muted">Empty</p>'}`}
function prepareView(){let c=hero();return `<p class="muted">Choose up to 5 prepared abilities. Changes only available in camp.</p>${TALENTS[c.cls].filter(t=>t[3]==='ability'&&c.talents[t[0]]).map(t=>`<div class="encounter"><span>✨</span><div class="details">${t[0]}</div>${btn(c.prepared.includes(t[0])?'Unprepare':'Prepare','prepare:'+t[0],c.prepared.includes(t[0])?'selected':'small')}</div>`).join('')||'<div class="card">No abilities unlocked yet.</div>'}`}
function craftList(inCamp){let c=hero();return `<div class="tabs">${btn('Crafting','craftmode:craft',state.craftMode!=='processing'?'selected':'')}${btn('Processing','craftmode:processing',state.craftMode==='processing'?'selected':'')}</div>${state.craftMode==='processing'?processingView():`<p class="muted">Only known recipes are shown. Crafting never auto-equips gear.</p><div class="craft-grid">${['Weaponry','Armor smithing','Utility','Camper'].map(prof=>{let p=c.professions[prof];return `<section class="craft-column"><h3>${prof}</h3><small>Lv ${p.level} · ${p.xp}/${xpNeeded(p.level)} XP</small>${meter(p.xp,xpNeeded(p.level))}${RECIPES.filter(r=>r.profession===prof&&knownRecipe(c,r)).sort((a,b)=>Number(canCraft(b))-Number(canCraft(a))).map(r=>`<div class="craft-recipe"><b>${esc(r.name)}</b><small>${Object.entries(r.cost).map(([k,v])=>`${NAMES[k]||k}: ${count(c,k)}/${v}`).join(' · ')}</small>${inCamp?btn(canCraft(r)?'Craft':'Unavailable','craft:'+r.id,canCraft(r)?'primary small':'small'):'<small>Craft at Camp</small>'}</div>`).join('')}</section>`}).join('')}</div>`}`}

function missing(r){return Object.entries(r.cost).reduce((s,[k,n])=>s+Math.max(0,n-count(hero(),k)),0)}
function esc(s){return String(s).replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]))}
function handle(action){if(!action)return;let c=hero(),parts=action.split(':'),[verb,arg]=parts;
if(verb==='switchHero'){state.screen='select';state.combat=null;save();render();return}
if(verb==='create'){state.screen='create';render();return}
if(verb==='cancel'){state.screen='select';render();return}
if(verb==='class'){window.newClass=arg;document.querySelector('#preview').textContent=arg==='Fighter'?'🛡️':'🧙‍♂️';document.querySelector('#preview-name').textContent=arg;document.querySelectorAll('[data-action^="class:"]').forEach(b=>b.classList.toggle('selected',b.dataset.action==='class:'+arg));return}
if(verb==='random'){document.querySelector('#hero-name').value=['Aldric','Elowen','Thorne','Lyra','Bryn','Eldrin','Freya','Rowan'][Math.floor(Math.random()*8)];return}
if(verb==='make'){let name=document.querySelector('#hero-name').value.trim();if(!name)return toast('Enter a character name');createCharacter(name,window.newClass||'Fighter');state.screen='map';generateEncounters();render();return}
if(verb==='choose'){state.active=arg;state.screen='map';save();generateEncounters();render();return}
if(verb==='screen'){if(arg==='camp'){if(!c.campPosition)return toast('Place your camp on the map first');state.screen='map';render();return}state.screen=arg;render();return}
if(verb==='openCamp'){if(!c.campPosition)return toast('Tap the map to place your camp first');state.screen='camp';render();return}
if(verb==='tab'){state.tab=arg;render();return}
if(verb==='camptab'){state.campTab=arg;render();return}
if(verb==='stat'){if(c.statPoints<=0)return toast('No stat points');c.stats[arg]++;c.statPoints--;save();render();return}
if(verb==='sub'){let k=parts[1],sub=parts.slice(2).join(':'),s=c.skills[k];if(!s.points)return toast('No skill points');s.points--;s.sub[sub]++;save();render();return}
if(verb==='talent'){let t=TALENTS[c.cls].find(t=>t[0]===arg);if(!t)return;let [name,req,max]=t;if(!c.talentPoints||((c.talents[name]||0)>=max)||req.length&&!req.some(x=>c.talents[x]))return toast('Talent unavailable');c.talentPoints--;c.talents[name]=(c.talents[name]||0)+1;save();render();return}
if(verb==='prepare'){if(state.screen!=='camp')return toast('Prepare abilities in camp');if(c.prepared.includes(arg))c.prepared=c.prepared.filter(x=>x!==arg);else if(c.prepared.length<5)c.prepared.push(arg);else return toast('Max 5 abilities');save();render();return}
if(verb==='refresh'){generateEncounters();render();return}
if(verb==='locate'){if(!navigator.geolocation)return toast('GPS unavailable');navigator.geolocation.getCurrentPosition(p=>{state.position=[p.coords.latitude,p.coords.longitude];generateEncounters();render();toast('Location updated')},()=>toast('GPS denied / unavailable; demo mode active'),{enableHighAccuracy:true,timeout:10000});return}
if(verb==='open'){state.selected=arg;window.huntAttempts=3;state.screen='encounter';render();return}
if(verb==='fight'){let e=state.encounters.find(x=>x.id===state.selected);startCombat(e);state.screen='combat';render();return}
if(verb==='collect'){let e=state.encounters.find(x=>x.id===state.selected);let drops=collect(e);toast(drops.length?'Collected: '+drops.map(k=>NAMES[k]||k).join(', '):'No materials this time');state.screen='map';render();return}
if(verb==='hunt'){let e=state.encounters.find(x=>x.id===state.selected);let r=hunt(e);window.huntAttempts=(window.huntAttempts??3)-1;if(r.success){toast('Hunt successful! '+(r.drops.map(k=>NAMES[k]).join(', ')||'No drops'));state.screen='map'}else if(window.huntAttempts<=0){removeEncounter(e.id);toast('Prey escaped');state.screen='map'}else toast('Missed! '+window.huntAttempts+' attempts left');render();return}
if(verb==='action'){queueAction(arg);render();return}
if(verb==='move'){let from=parts[1],item=parts.slice(2).join(':');if(!c[from][item])return;addItem(c,item,-1,from);addItem(c,item,1,from==='inventory'?'campInventory':'inventory');render();return}
if(verb==='closeInfo'){document.querySelector('#info-overlay')?.remove();return}
if(verb==='talentinfo'){talentDetails(arg);return}
if(verb==='skillinfo'){let k=parts[1],sub=parts.slice(2).join(':');infoModal(sub||k,sub?skillDescriptions(k,sub):'Main skill '+k+' er summen af de tre underfærdigheder. XP opnås ved relevante handlinger; level-up giver et point til en underfærdighed.');return}
if(verb==='statinfo'){let d={Strength:'Styrker Fighter-angreb og visse talents.',Endurance:'Påvirker karakterens udholdenhed i eksisterende combat-formler.',Dexterity:'Bruges i undvigelse og flugt under kamp.',Wisdom:'Indgår i udvalgte Caster-abilities, herunder Fireball.',Intellect:'Styrker Caster-angreb og udvalgte abilities.'};infoModal(arg,d[arg]||'');return}
if(verb==='gearinfo'){let g=parts[1]==='owned'?(c.ownedGear||[]).find(g=>g.id===parts[2]):c.gear[parts[2]];if(g)infoModal(g.name,'Slot: '+(g.slot||parts[2])+'<p>Bonuses: '+(Object.entries(g.bonus||{}).map(([k,v])=>`${k} +${v}`).join(', ')||'None')+'</p><p>Durability: '+g.durability+'/100</p>');return}
if(verb==='equip'){let i=(c.ownedGear||[]).findIndex(g=>g.id===arg);if(i<0)return;let g=c.ownedGear.splice(i,1)[0],old=c.gear[g.slot];if(old&&old.name!=='Basic '+g.slot)c.ownedGear.push({...old,id:newId(),slot:g.slot});c.gear[g.slot]=g;save();render();return}
if(verb==='unequip'){let slot=arg,g=c.gear[slot];if(!g)return;c.ownedGear=c.ownedGear||[];c.ownedGear.push({...g,id:newId(),slot});c.gear[slot]={name:'Empty',bonus:{},durability:100};save();render();return}
if(verb==='craftmode'){state.craftMode=arg;render();return}
if(verb==='process'){if(state.screen!=='camp')return toast('Processing only at Camp');let r=PROCESSING.find(x=>x.id===arg);if(!r)return;let k=Object.keys(r.cost)[0];if(count(c,k)<2)return toast('Need 2 '+(NAMES[k]||k));consume(c,k,2);addItem(c,r.output);skillXP(c,'Culture',2);save();toast('Processed '+(NAMES[r.output]||r.output)+' · +2 Processing XP');render();return}
if(verb==='craft'){if(state.screen!=='camp')return toast('Crafting is only available in camp');let r=RECIPES.find(x=>x.id===arg);toast(craft(r));render();return}
if(verb==='rest'){if(state.screen!=='camp')return toast('Rest only in camp');if(window.resting)return;window.resting=true;toast('Resting for 20 seconds…');render();let left=20;window.restTimer=setInterval(()=>{left--;let el=document.querySelector('#rest-progress');if(el)el.textContent='Rest: '+left+' seconds remaining';if(left<=0){clearInterval(window.restTimer);window.resting=false;c.hp=maxHP(c);c.charges=maxCharges(c);save();toast('Fully rested!');render()}},1000);return}
}

window.addEventListener('error',function(e){document.getElementById('app').innerHTML='<div style="padding:25px;color:white;background:#15262b;min-height:100vh;font-family:sans-serif"><h2>Spillet kunne ikke starte</h2><p>'+String(e.message).replace(/</g,'&lt;')+'</p><p>Åbn spillet via GitHub Pages i Safari.</p></div>'});
try{load();if(hero())generateEncounters();render()}catch(e){console.error('Startup failed',e);document.getElementById('app').innerHTML='<div style="padding:24px;color:white;background:#15262b;min-height:100vh"><h2>Startup error</h2><pre style="white-space:pre-wrap">'+String(e.stack||e).replace(/</g,'&lt;')+'</pre></div>'}
document.addEventListener('click',e=>{let target=e.target.closest('[data-action]');if(target)handle(target.dataset.action)});
setInterval(()=>{regen();if(state.screen==='combat'&&state.combat){let events=tickCombat();if(events){if(!state.combat){state.screen='map';render();toast(events.join(' · '))}else{render();showCombatNumbers(events)}}}},1000);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')save()});

setInterval(()=>{if(state.screen==='combat'&&state.combat){let events=tickPassive();if(events){if(!state.combat)state.screen='map';render();if(!state.combat)toast(events.join(' · '));else showCombatNumbers(events)}}},500);
