import {STATS,SKILLS} from './data.js';
const KEY='dndgo_prototype_v1';
export const state={characters:[],active:null,screen:'select',tab:'character',campTab:'inventory',craftTab:'craft',encounters:[],combat:null,selected:null,huntAttempts:3,map:null,position:null};
export function load(){try{let d=JSON.parse(localStorage.getItem(KEY)||'{}');state.characters=d.characters||[];state.active=null;for(const c of state.characters){if(!Array.isArray(c.knownRecipes))c.knownRecipes=['wand','mace','boots','wolfchest','hpotion','cpotion','firepit','furnace','sawmill']} }catch{}}
export function save(){try{localStorage.setItem(KEY,JSON.stringify({characters:state.characters,active:state.active}))}catch(e){console.warn('Kunne ikke gemme',e)}}
export function hero(){return state.characters.find(c=>c.id===state.active)}
export function createCharacter(name,cls){let c={id:('randomUUID' in crypto ? crypto.randomUUID() : 'id-'+Date.now()+'-'+Math.random().toString(36).slice(2)),name,cls,level:1,xp:0,statPoints:5,talentPoints:0,stats:Object.fromEntries(STATS.map(s=>[s,0])),hp:100,charges:0,skills:Object.fromEntries(Object.keys(SKILLS).map(s=>[s,{level:3,xp:0,points:0,sub:Object.fromEntries(SKILLS[s].map(k=>[k,1]))}])),professions:Object.fromEntries(['Weaponry','Armor smithing','Utility','Camper'].map(s=>[s,{level:0,xp:0}])),talents:{},prepared:[],inventory:{},campInventory:{},gold:0,gear:{main:{name:'Basic weapon',bonus:{},durability:100},head:{name:'Basic helmet',bonus:{},durability:100},chest:{name:'Basic chest',bonus:{},durability:100},legs:{name:'Basic legs',bonus:{},durability:100},boots:{name:'Basic boots',bonus:{},durability:100}},tools:{pickaxe:100,axe:100,knife:100},camp:[],knownRecipes:['wand','mace','boots','wolfchest','hpotion','cpotion','firepit','furnace','sawmill'],campPosition:null,lastTime:Date.now(),debuffUntil:0};state.characters.push(c);state.active=c.id;save();return c}
export function maxHP(c){return 100+(c.level-1)*5+(c.gear.main?.bonus?.HP||0)}
export function stat(c,k){return (c.stats[k]||0)+Object.values(c.gear).reduce((s,g)=>s+(g?.bonus?.[k]||0),0)+(c.talents['+1 '+k.toLowerCase()]||0)}
export function maxCharges(c){return c.level<2?0:3+(c.talents['+1 Ability charge']||0)+(c.camp.includes('wall')?1:0)}
export function ac(c){return (c.cls==='Fighter'?20:10)+(c.level-1)*5+Object.values(c.gear).reduce((s,g)=>s+(g?.bonus?.AC||0),0)}
export function addItem(c,k,n=1,where='inventory'){let bag=c[where];bag[k]=(bag[k]||0)+n;if(bag[k]<=0)delete bag[k];save()}
export function count(c,k){return (c.inventory[k]||0)+(c.campInventory[k]||0)}
export function consume(c,k,n){let a=Math.min(n,c.inventory[k]||0);addItem(c,k,-a);if(n>a)addItem(c,k,-(n-a),'campInventory')}
export function xpNeeded(l){return Math.ceil(2*(0.06*l*l+0.5*l+10))}
export function addXP(c,n){if(c.level>=10)return; c.xp+=n;while(c.level<10&&c.xp>=xpNeeded(c.level)){c.xp-=xpNeeded(c.level);c.level++;c.statPoints+=5;c.talentPoints++;c.hp=Math.min(maxHP(c),c.hp+5);state.levelUps=(state.levelUps||[]).concat(c.level);if(c.level===2)c.charges=3}save()}
export function skillXP(c,k,n){let s=c.skills[k];s.xp+=n;while(s.level<25&&s.xp>=xpNeeded(s.level)){s.xp-=xpNeeded(s.level);s.level++;s.points++}save()}
export function professionXP(c,k,n=2){let p=c.professions[k];p.xp+=n;while(p.level<25&&p.xp>=xpNeeded(p.level)){p.xp-=xpNeeded(p.level);p.level++}save()}
export function regen(){/* HP regenerates only via camp rest or explicit healing abilities. */}
