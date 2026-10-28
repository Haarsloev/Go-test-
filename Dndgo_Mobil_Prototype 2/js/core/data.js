export const STATS=['Strength','Endurance','Dexterity','Wisdom','Intellect'];
export const SKILLS={Nature:['Hunting','Gathering','Stone cutting'],Magic:['Enchantment','Reading','Medicine'],Culture:['Processing','Religion','Charisma'],Combat:['Fighting','Protection','Survival'],Builder:['Cooking','Masonry','Carpentry']};
export const EMOJI={wood:'🪵',flower:'🌸',grain:'🌾',stone_small:'🪨',stone_medium:'🪨',stone_large:'🪨',iron:'⛓️',copper:'🟠',antler:'🦌',deer_hide:'🦌',snake_skin:'🐍',venom:'🧪',croc_skin:'🐊',croc_heart:'❤️',wolf_fur:'🐺',wolf_tooth:'🦷',wolf_heart:'❤️',deer_heart:'❤️',food:'🍲'};
export const NAMES={wood:'Træ',flower:'Blomster',grain:'Korn',stone_small:'Små sten',stone_medium:'Mellem sten',stone_large:'Store sten',iron:'Jern',copper:'Kobber',antler:'Hjortegevir',deer_hide:'Hjortepels',snake_skin:'Slangeskind',venom:'Slangegift',croc_skin:'Krokodillelæder',croc_heart:'Krokodillehjerte',wolf_fur:'Ulvepels',wolf_tooth:'Ulvetænder',wolf_heart:'Ulvehjerte',deer_heart:'Hjortehjerte',food:'Mad'};
export const RECIPES=[
{id:'wand',name:'Rough wooden wand',profession:'Weaponry',cost:{wood:3,antler:1},slot:'main',bonus:{Intellect:1}},
{id:'mace',name:'Rough stone mace',profession:'Weaponry',cost:{wood:3,stone_large:1},slot:'main',bonus:{Strength:1}},
{id:'boots',name:'Croc leather boots',profession:'Armor smithing',cost:{croc_skin:4},slot:'boots',bonus:{Survival:1}},
{id:'wolfchest',name:'Wolf pels (chest)',profession:'Armor smithing',cost:{wolf_fur:5},slot:'chest',bonus:{Nature:1}},
{id:'hpotion',name:'Health potion',profession:'Utility',cost:{flower:5,deer_heart:1},requires:['firepit'],effect:'Heal 20 HP'},
{id:'cpotion',name:'Charge potion',profession:'Utility',cost:{venom:1,flower:3,croc_heart:1},requires:['firepit'],effect:'+1 charge'},
{id:'firepit',name:'Firepit',profession:'Camper',cost:{stone_medium:12,stone_small:20},effect:'Camp upgrade'},
{id:'furnace',name:'Iron Furnace',profession:'Camper',cost:{stone_large:10},effect:'Camp upgrade'},
{id:'sawmill',name:'Sawmill',profession:'Camper',cost:{iron:5,wood:10,stone_large:3},requires:['firepit','furnace'],effect:'Camp upgrade'},
{id:'toolstand',name:'Tool craft stand',profession:'Camper',level:5,cost:{wood:4,stone_small:4,iron:4},effect:'Camp upgrade'},
{id:'stoneaxe',name:'Stone axe',profession:'Weaponry',level:10,requires:['toolstand'],cost:{wood:5,stone_medium:2},slot:'main',bonus:{damage:10}},
{id:'dagger',name:'Dagger',profession:'Weaponry',level:12,requires:['forge'],cost:{iron:5,wood:2,copper:1},slot:'main',bonus:{damage:12}},
{id:'naturewand',name:'Nature wand',profession:'Weaponry',cost:{antler:3,wood:2,wolf_tooth:2},slot:'main',bonus:{Wisdom:1,Intellect:1,HP:10},special:'Nature ≥15, Enchantment ≥10'},
{id:'shortsword',name:'Short sword',profession:'Weaponry',cost:{iron:10,wood:2},slot:'main',bonus:{Strength:1,Wisdom:1},special:'Combat ≥15'},
{id:'longsword',name:'Long sword',profession:'Weaponry',level:20,cost:{copper:10,wood:2},slot:'main',bonus:{Strength:3}},
{id:'chainlegs',name:'Chainmail legs',profession:'Armor smithing',level:20,cost:{iron:10},slot:'legs',bonus:{AC:3}},
{id:'chainchest',name:'Chainmail chest',profession:'Armor smithing',level:15,cost:{iron:12},slot:'chest',bonus:{AC:2,Strength:5}},
{id:'chainhelm',name:'Chainmail helmet',profession:'Armor smithing',level:25,cost:{iron:4},slot:'head',bonus:{AC:4,Endurance:3}},
{id:'naturechest',name:'Nature chest',profession:'Armor smithing',level:15,cost:{wolf_fur:6},slot:'chest',bonus:{Intellect:2,Wisdom:2},special:'Nature ≥20'},
{id:'naturelegs',name:'Nature legs',profession:'Armor smithing',level:25,cost:{deer_hide:10},slot:'legs',bonus:{Endurance:2,Wisdom:2},special:'Nature ≥20'},
{id:'epicchest',name:'Epic chest',profession:'Armor smithing',level:25,cost:{wolf_fur:10,croc_skin:3},slot:'chest',bonus:{Wisdom:10,Intellect:10,Strength:10,Endurance:10},special:'Magic ≥20'},
{id:'naturehelm',name:'Nature helmet',profession:'Armor smithing',level:20,cost:{antler:10},slot:'head',bonus:{Wisdom:1,damage:10},special:'Nature ≥20'},
{id:'pulley',name:'Pulley system',profession:'Camper',level:15,requires:['forge'],cost:{wood:10,iron:10},effect:'Camp upgrade'},
{id:'wall',name:'Stone wall',profession:'Camper',level:20,requires:['pulley'],cost:{stone_large:100},effect:'Camp upgrade'}
];
export const TALENTS={
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
export const ENCOUNTERS=[
{type:'combat',kind:'wolf',name:'Ulv',icon:'🐺',hp:100,ac:20,dps:15},
{type:'combat',kind:'croc',name:'Krokodille',icon:'🐊',hp:200,ac:30,dps:12},
{type:'prey',kind:'deer',name:'Hjort',icon:'🦌'},
{type:'prey',kind:'snake',name:'Slange',icon:'🐍'},
{type:'gather',kind:'tree',name:'Træ',icon:'🌲',tier:1},
{type:'gather',kind:'flower',name:'Blomster',icon:'🌸',tier:1},
{type:'gather',kind:'mine',name:'Mine',icon:'⛏️',tier:1}
];
