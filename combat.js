import {state,hero,save,stat,ac,maxHP,maxCharges,skillXP} from '../core/state.js';
import {combatLoot} from './encounters.js';
export function startCombat(e){let bonus=e.level===1?0:1.5*e.level+10;state.combat={e,hp:Math.round(e.hp+bonus),max:Math.round(e.hp+bonus),dps:Math.round(e.dps+bonus),ac:Math.round(e.ac+bonus),turn:0,queued:null,log:[],floating:[],effects:[],enemyEffects:[],fleeFailed:false,brace:0,shield:0,heat:0};save()}
export function queueAction(a){if(state.combat)state.combat.queued=a}
export function tickCombat(){let b=state.combat,c=hero();if(!b)return null;b.turn++;let notes=[],act=b.queued|| (c.cls==='Fighter'?'Slå':'Wand');b.queued=null;
const damage=(v,ability=false)=>{let d=Math.max(1,Math.round(v));if(Math.random()*100<b.ac){notes.push('Modstanderen parer');(b.floating||=[]).push({target:'enemy',text:'MISS',kind:'miss'});return}b.hp=Math.max(0,b.hp-d);notes.push((ability?'✨ ':'⚔️ ')+d+' skade');(b.floating||=[]).push({target:'enemy',text:'-'+d,kind:'damage'})};
const heal=(v)=>{let h=Math.min(maxHP(c)-c.hp,Math.round(v));c.hp+=h;notes.push('💚 +'+h+' HP');(b.floating||=[]).push({target:'player',text:'+'+h,kind:'heal'})};
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
if(!blocked&&Math.random()*100>=Math.min(90,ac(c)+b.brace+stat(c,'Dexterity'))){let dmg=Math.round(b.dps*(b.e.kind==='wolf'&&Math.random()<.2?1.4:1));if(c.talents['Reduce all dmg taken by 15%'])dmg=Math.round(dmg*.85);c.hp=Math.max(0,c.hp-dmg);notes.push('💔 -'+dmg+' HP');(b.floating||=[]).push({target:'player',text:'-'+dmg,kind:'damage'});if(b.effects.some(x=>x.name==='Thorns'))damage(dmg*.3,true)}
else notes.push(blocked?'🛡️ Angreb blokeret':'🛡️ Pareret / undveget');
if(c.hp<=0){c.inventory={};c.debuffUntil=Date.now()+3600000;c.hp=1;notes.push('☠️ Besejret: inventory tabt, 1 times debuff');state.combat=null}
b.brace=0;if(state.combat)state.combat.log.unshift(...notes);save();return notes}

export function tickPassive(){let b=state.combat;if(!b)return null;let notes=[];for(let ef of b.enemyEffects){if(ef.name==='Bleed'){let d=Math.max(1,Math.round(ef.damage));b.hp=Math.max(0,b.hp-d);notes.push('🩸 Bleed -'+d+' HP');(b.floating||=[]).push({target:'enemy',text:'-'+d+' 🩸',kind:'damage'})}ef.left--}b.enemyEffects=b.enemyEffects.filter(x=>x.left>0);if(b.hp<=0){let drops=combatLoot(b.e);notes.push('🏆 Sejr! Loot: '+(drops.join(', ')||'intet'));state.combat=null}if(state.combat)state.combat.log.unshift(...notes);save();return notes.length?notes:null}
