import { n } from '@haaxor1689/nil';

import {
  DbcSchema,
  StringRefSchema,
  Position,
  LocalizedStringRef,
  ArrayField
} from './utils';

export const AnimationData = DbcSchema({
  id: n.int32(),
  name: StringRefSchema,
  weaponFlags: n.int32(),
  bodyFlags: n.int32(),
  flags: n.int32(),
  fallback: n.int32(),
  previous: n.int32()
});

export const AreaPOI = DbcSchema({
  id: n.int32(),
  importance: n.int32(),
  icon: n.int32(),
  factionId: n.int32(),
  ...Position,
  continentId: n.int32(),
  flags: n.int32(),
  areaId: n.int32(),
  ...LocalizedStringRef('name'),
  ...LocalizedStringRef('description'),
  worldStateId: n.int32()
});

export const AreaTable = DbcSchema({
  id: n.int32(),
  continentId: n.int32(),
  parentAreaId: n.int32(),
  areaBit: n.int32(),
  flags: n.int32(),

  soundPreferenceId: n.int32(),
  underwaterSoundPreferenceId: n.int32(),
  soundAmbienceId: n.int32(),
  zoneMusicId: n.int32(),
  zoneIntroMusicId: n.int32(),

  explorationLevel: n.int32(),
  ...LocalizedStringRef('name'),
  factionGroupMask: n.int32(),
  liquidTypeId: n.int32(),
  minElevation: n.float(),
  ambientMultiplier: n.float(),
  lightId: n.int32()
});

export const AreaTrigger = DbcSchema({
  id: n.int32(),
  continentId: n.int32(),
  ...Position,
  radius: n.float(),
  boxLength: n.float(),
  boxWidth: n.float(),
  boxHeight: n.float(),
  boxYaw: n.float()
});

export const AuctionHouse = DbcSchema({
  id: n.int32(),
  factionId: n.int32(),
  depositRate: n.int32(),
  consignmentRate: n.int32(),
  ...LocalizedStringRef('name')
});

export const BankBagSlotPrices = DbcSchema({
  id: n.int32(),
  cost: n.int32()
});

export const CameraShakes = DbcSchema({
  id: n.int32(),
  shakeType: n.uint32(),
  direction: n.uint32(),
  amplitude: n.float(),
  frequency: n.float(),
  duration: n.float(),
  phase: n.float(),
  coefficient: n.float()
});

export const Cfg_Categories = DbcSchema({
  id: n.int32(),
  region: n.int32(),
  ...LocalizedStringRef('name')
});

export const Cfg_Configs = DbcSchema({
  id: n.int32(),
  realmType: n.int32(),
  playerKillingAllowed: n.int32(),
  rolePlaying: n.int32()
});

export const CharacterFacialHairStyles = DbcSchema({
  raceId: n.int32(),
  sexId: n.int32(),
  variationId: n.int32(),
  beardGeoset: n.int32(),
  moustacheGeoset: n.int32(),
  sideburnGeoset: n.int32(),
  ...ArrayField('otherGeoset', n.int32(), 3)
});

export const CharBaseInfo = DbcSchema({
  raceId: n.uint8(),
  classId: n.uint8()
});

export const CharHairGeosets = DbcSchema({
  id: n.int32(),
  raceId: n.int32(),
  sexId: n.int32(),
  variationId: n.int32(),
  geosetId: n.int32(),
  showScalp: n.int32()
});

export const CharHairTextures = DbcSchema({
  id: n.int32(),
  raceId: n.int32(),
  sexId: n.int32(),
  ...ArrayField('unknown', n.int32(), 5)
});

export const CharSections = DbcSchema({
  id: n.int32(),
  raceId: n.int32(),
  sexId: n.int32(),
  baseSection: n.int32(),
  variationIndex: n.int32(),
  colorIndex: n.int32(),
  ...ArrayField('textureName', StringRefSchema, 3),
  flags: n.int32()
});

export const CharStartOutfit = DbcSchema({
  id: n.int32(),
  raceId: n.uint8(),
  classId: n.uint8(),
  sexId: n.uint8(),
  outfitId: n.uint8(),
  ...ArrayField('itemId', n.int32(), 12),
  ...ArrayField('displayItemId', n.int32(), 12),
  ...ArrayField('inventoryType', n.int32(), 12)
});

export const ChatChannels = DbcSchema({
  id: n.int32(),
  flags: n.int32(),
  factionGroup: n.int32(),
  ...LocalizedStringRef('name'),
  ...LocalizedStringRef('shortcut')
});

export const ChatProfanity = DbcSchema({
  id: n.int32(),
  text: StringRefSchema
});

export const ChrClasses = DbcSchema({
  id: n.int32(),
  playerClass: n.int32(),
  damageBonusStat: n.int32(),
  displayPower: n.int32(),
  petNameToken: StringRefSchema,
  ...LocalizedStringRef('name'),
  filename: StringRefSchema,
  spellClassSet: n.int32(),
  flags: n.int32()
});

export const ChrRaces = DbcSchema({
  id: n.int32(),
  flags: n.int32(),
  factionId: n.int32(),
  explorationSoundId: n.int32(),
  maleDisplayId: n.int32(),
  femaleDisplayId: n.int32(),
  clientPrefix: StringRefSchema,
  mountScale: n.float(),
  baseLanguage: n.int32(),
  creatureType: n.int32(),
  loginEffectSpellId: n.int32(),
  combatStunSpellId: n.int32(),
  resSicknessSpellId: n.int32(),
  splashSoundId: n.int32(),
  startingTaxiNodes: n.int32(),
  clientFileString: StringRefSchema,
  cinematicSequenceId: n.int32(),
  ...LocalizedStringRef('name'),
  maleCustomization: StringRefSchema,
  femaleCustomization: StringRefSchema,
  hairCustomization: StringRefSchema
});

export const CinematicCamera = DbcSchema({
  id: n.int32(),
  model: StringRefSchema,
  soundId: n.int32(),
  originX: n.float(),
  originY: n.float(),
  originZ: n.float(),
  originFacing: n.float()
});

export const CinematicSequences = DbcSchema({
  id: n.int32(),
  soundId: n.int32(),
  ...ArrayField('camera', n.int32(), 8)
});

export const CreatureDisplayInfo = DbcSchema({
  id: n.int32(),
  modelId: n.int32(),
  soundId: n.int32(),
  extendedDisplayInfoId: n.int32(),
  modelScale: n.float(),
  modelAlpha: n.int32(),
  ...ArrayField('textureVariant', StringRefSchema, 3),
  sizeClass: n.int32(),
  bloodId: n.int32(),
  npcSoundId: n.int32()
});

export const CreatureDisplayInfoExtra = DbcSchema({
  id: n.int32(),
  displayRaceId: n.int32(),
  displaySexId: n.int32(),
  skinId: n.int32(),
  faceId: n.int32(),
  hairStyleId: n.int32(),
  hairColorId: n.int32(),
  facialHairId: n.int32(),
  ...ArrayField('itemDisplayId', n.int32(), 10),
  bakeName: StringRefSchema
});

export const CreatureFamily = DbcSchema({
  id: n.int32(),
  minScale: n.float(),
  minScaleLevel: n.int32(),
  maxScale: n.float(),
  maxScaleLevel: n.int32(),
  petFoodMask: n.int32(),
  petTalentType: n.int32(),
  categoryEnumId: n.int32(),
  ...LocalizedStringRef('name'),
  iconFile: StringRefSchema
});

export const CreatureModelData = DbcSchema({
  id: n.int32(),
  flags: n.int32(),
  modelName: StringRefSchema,
  sizeClass: n.int32(),
  modelScale: n.float(),
  bloodId: n.int32(),
  footprintTextureId: n.int32(),
  footprintTextureLength: n.float(),
  footprintTextureWidth: n.float(),
  footprintTextureScale: n.float(),
  foleyMaterialId: n.int32(),
  footstepShakeSize: n.int32(),
  deathThudShakeSize: n.int32(),
  soundId: n.int32(),
  collisionHeight: n.float(),
  mountHeight: n.float()
});

export const CreatureSoundData = DbcSchema({
  id: n.int32(),
  extertionId: n.int32(),
  extertionCriticalId: n.int32(),
  injuryId: n.int32(),
  injuryCriticalId: n.int32(),
  injuryCrushingBlowId: n.int32(),
  deathId: n.int32(),
  stunId: n.int32(),
  standId: n.int32(),
  footstepId: n.int32(),
  aggroId: n.int32(),
  wingFlapId: n.int32(),
  wingGlideId: n.int32(),
  alertId: n.int32(),
  ...ArrayField('fidgetId', n.int32(), 4),
  ...ArrayField('customAttackId', n.int32(), 4),
  npcSoundId: n.int32(),
  loopSoundId: n.int32(),
  creatureImpactType: n.int32(),
  jumpStartId: n.int32(),
  jumpEndId: n.int32(),
  petAttackId: n.int32(),
  petOrderId: n.int32(),
  petDismissId: n.int32()
});

export const CreatureSpellData = DbcSchema({
  id: n.int32(),
  ...ArrayField('spellId', n.int32(), 4),
  ...ArrayField('availability', n.int32(), 4)
});

export const CreatureType = DbcSchema({
  id: n.int32(),
  ...LocalizedStringRef('name'),
  flags: n.int32()
});

export const DeathThudLookups = DbcSchema({
  id: n.int32(),
  sizeClass: n.int32(),
  terrainTypeSoundId: n.int32(),
  soundId: n.int32(),
  waterSoundId: n.int32()
});

export const DurabilityCosts = DbcSchema({
  id: n.int32(),
  ...ArrayField('weaponClassCost', n.int32(), 21),
  ...ArrayField('armorClassCost', n.int32(), 8)
});

export const DurabilityQuality = DbcSchema({
  id: n.int32(),
  data: n.float()
});

export const Emotes = DbcSchema({
  id: n.int32(),
  slashCommand: StringRefSchema,
  animationId: n.int32(),
  flags: n.int32(),
  specProc: n.int32(),
  specProcParam: n.int32(),
  soundId: n.int32()
});

export const EmotesText = DbcSchema({
  id: n.int32(),
  name: StringRefSchema,
  emoteId: n.int32(),
  ...ArrayField('text', n.int32(), 16)
});

export const EmotesTextData = DbcSchema({
  id: n.int32(),
  ...LocalizedStringRef('text')
});

export const EmotesTextSound = DbcSchema({
  id: n.int32(),
  emotesTextId: n.int32(),
  raceId: n.int32(),
  sexId: n.int32(),
  soundId: n.int32()
});

export const Exhaustion = DbcSchema({
  id: n.int32(),
  xp: n.int32(),
  factor: n.float(),
  outdoorHours: n.int32(),
  indoorHours: n.int32(),
  ...LocalizedStringRef('name'),
  threshold: n.float()
});

export const Faction = DbcSchema({
  id: n.int32(),
  reputationIdx: n.int32(),
  ...ArrayField('repRaceMask', n.int32(), 4),
  ...ArrayField('repClassMask', n.int32(), 4),
  ...ArrayField('repBase', n.int32(), 4),
  ...ArrayField('repFlags', n.int32(), 4),
  parentFactionId: n.int32(),
  ...LocalizedStringRef('name'),
  ...LocalizedStringRef('description')
});

export const FactionGroup = DbcSchema({
  id: n.int32(),
  maskId: n.int32(),
  internalName: StringRefSchema,
  ...LocalizedStringRef('name')
});

export const FactionTemplate = DbcSchema({
  id: n.int32(),
  faction: n.int32(),
  flags: n.int32(),
  factionGroup: n.int32(),
  friendGroup: n.int32(),
  enemyGroup: n.int32(),
  ...ArrayField('enemy', n.int32(), 4),
  ...ArrayField('friend', n.int32(), 4)
});

export const FootstepTerrainLookup = DbcSchema({
  id: n.int32(),
  creatureFootstepId: n.int32(),
  terrainSoundId: n.int32(),
  soundId: n.int32(),
  splashSoundId: n.int32()
});

export const GameObjectArtKit = DbcSchema({
  id: n.int32(),
  ...ArrayField('textureVariant', StringRefSchema, 3),
  ...ArrayField('attachModel', StringRefSchema, 4)
});

export const GameObjectDisplayInfo = DbcSchema({
  id: n.int32(),
  modelName: StringRefSchema,
  standSound: n.int32(),
  openSound: n.int32(),
  loopSound: n.int32(),
  closeSound: n.int32(),
  destroySound: n.int32(),
  openedSound: n.int32(),
  ...ArrayField('customSound', n.int32(), 4)
});

export const GameTips = DbcSchema({
  id: n.int32(),
  ...LocalizedStringRef('text')
});

export const GMSurveyCurrentSurvey = DbcSchema({
  id: n.int32(),
  gmSurveyId: n.int32()
});

export const GMSurveyQuestions = DbcSchema({
  id: n.int32(),
  ...LocalizedStringRef('question')
});

export const GMSurveySurveys = DbcSchema({
  id: n.int32(),
  ...ArrayField('question', n.int32(), 10)
});

export const GMTicketCategory = DbcSchema({
  id: n.int32(),
  ...LocalizedStringRef('category')
});

export const GroundEffectDoodad = DbcSchema({
  id: n.int32(),
  tagId: n.int32(),
  path: StringRefSchema
});

export const GroundEffectTexture = DbcSchema({
  id: n.int32(),
  ...ArrayField('doodadId', n.int32(), 4),
  density: n.int32(),
  terrainTypeId: n.int32()
});

export const HelmetGeosetVisData = DbcSchema({
  id: n.int32(),
  hairRaceMask: n.int32(),
  ...ArrayField('facialRaceMask', n.int32(), 3),
  earsRaceMask: n.int32()
});

export const ItemBagFamily = DbcSchema({
  id: n.int32(),
  ...LocalizedStringRef('name')
});

export const ItemClass = DbcSchema({
  id: n.int32(),
  subclassMapId: n.int32(),
  flags: n.int32(),
  ...LocalizedStringRef('className')
});

export const ItemDisplayInfo = DbcSchema({
  id: n.int32(),
  ...ArrayField('modelName', StringRefSchema, 2),
  ...ArrayField('modelTexture', StringRefSchema, 2),
  inventoryIcon: StringRefSchema,
  ...ArrayField('geosetGroup', n.int32(), 3),
  flags: n.int32(),
  spellVisualId: n.int32(),
  groupSoundIndex: n.int32(),
  ...ArrayField('helmetGeosetVisId', n.int32(), 2),
  ...ArrayField('texture', StringRefSchema, 8),
  itemVisual: n.int32()
});

export const ItemPetFood = DbcSchema({
  id: n.int32(),
  ...LocalizedStringRef('name')
});

export const ItemRandomProperties = DbcSchema({
  id: n.int32(),
  name: StringRefSchema,
  ...ArrayField('enchantment', n.int32(), 5),
  ...LocalizedStringRef('suffix')
});

export const ItemSet = DbcSchema({
  id: n.int32(),
  ...LocalizedStringRef('name'),
  ...ArrayField('itemId', n.int32(), 17),
  ...ArrayField('setSpellId', n.int32(), 8),
  ...ArrayField('setThreshold', n.int32(), 8),
  requiredSkillId: n.int32(),
  requiredSkillRank: n.int32()
});

export const ItemSubClass = DbcSchema({
  classId: n.int32(),
  subclassId: n.int32(),
  prereqProficiency: n.int32(),
  postreqProficiency: n.int32(),
  flags: n.int32(),
  displayFlags: n.int32(),
  weaponParrySeq: n.int32(),
  weaponReadySeq: n.int32(),
  weaponAttackSeq: n.int32(),
  weaponSwingSize: n.int32(),
  ...LocalizedStringRef('displayName'),
  ...LocalizedStringRef('verboseName')
});

export const ItemSubClassMask = DbcSchema({
  classId: n.int32(),
  mask: n.int32(),
  ...LocalizedStringRef('name')
});

export const ItemVisualEffects = DbcSchema({
  id: n.int32(),
  model: StringRefSchema
});

export const ItemVisuals = DbcSchema({
  id: n.int32(),
  ...ArrayField('slot', n.int32(), 5)
});

export const Languages = DbcSchema({
  id: n.int32(),
  ...LocalizedStringRef('name')
});

export const LFGDungeons = DbcSchema({
  id: n.int32(),
  ...LocalizedStringRef('name'),
  levelMin: n.int32(),
  levelMax: n.int32(),
  instanceType: n.int32(),
  faction: n.int32()
});

export const Light = DbcSchema({
  id: n.int32(),
  continentId: n.int32(),
  ...Position,
  falloffStart: n.float(),
  falloffEnd: n.float(),
  paramStandardId: n.int32(),
  paramUnderwaterId: n.int32(),
  paramSunsetId: n.int32(),
  paramOtherId: n.int32(),
  paramDeathId: n.int32()
});

export const LightFloatBand = DbcSchema({
  id: n.int32(),
  num: n.int32(),
  ...ArrayField('time', n.int32(), 16),
  ...ArrayField('data', n.float(), 16)
});

export const LightIntBand = DbcSchema({
  id: n.int32(),
  num: n.int32(),
  ...ArrayField('time', n.int32(), 16),
  ...ArrayField('data', n.int32(), 16)
});

export const LightParams = DbcSchema({
  id: n.int32(),
  highlightSky: n.int32(),
  lightSkyboxId: n.int32(),
  glow: n.float(),
  waterShallowAlpha: n.float(),
  waterDeepAlpha: n.float(),
  oceanShallowAlpha: n.float(),
  oceanDeepAlpha: n.float(),
  flags: n.int32()
});

export const LightSkybox = DbcSchema({
  id: n.int32(),
  name: StringRefSchema
});

export const LiquidType = DbcSchema({
  id: n.int32(),
  name: StringRefSchema,
  type: n.int32(),
  spellId: n.int32()
});

export const LoadingScreens = DbcSchema({
  id: n.int32(),
  name: StringRefSchema,
  fileName: StringRefSchema
});

export const LoadingScreenTaxiSplines = DbcSchema({
  id: n.int32(),
  pathId: n.int32(),
  ...ArrayField('locX', n.float(), 8),
  ...ArrayField('locY', n.float(), 8),
  legIndex: n.int32()
});

export const Lock = DbcSchema({
  id: n.int32(),
  ...ArrayField('type', n.int32(), 8),
  ...ArrayField('index', n.int32(), 8),
  ...ArrayField('skill', n.int32(), 8),
  ...ArrayField('action', n.int32(), 8)
});

export const LockType = DbcSchema({
  id: n.int32(),
  ...LocalizedStringRef('name'),
  ...LocalizedStringRef('resource'),
  ...LocalizedStringRef('verb'),
  cursorName: StringRefSchema
});

export const MailTemplate = DbcSchema({
  id: n.int32(),
  ...LocalizedStringRef('body')
});

export const Map = DbcSchema({
  id: n.int32(),
  directory: StringRefSchema,
  instanceType: n.int32(),
  isPvP: n.int32(),
  ...LocalizedStringRef('name'),
  levelMin: n.int32(),
  levelMax: n.int32(),
  maxPlayers: n.int32(),
  ...ArrayField('unknown', n.int32(), 3),
  areaTableId: n.int32(),
  ...LocalizedStringRef('description'),
  ...LocalizedStringRef('description2'),
  loadingScreenId: n.int32(),
  raidOffset: n.int32(),
  ...ArrayField('unknown_', n.int32(), 2)
});

export const NameGen = DbcSchema({
  id: n.int32(),
  name: StringRefSchema,
  raceId: n.int32(),
  sexId: n.int32()
});

export const NamesProfanity = DbcSchema({
  id: n.int32(),
  name: StringRefSchema
});

export const NamesReserved = DbcSchema({
  id: n.int32(),
  name: StringRefSchema
});

export const NPCSounds = DbcSchema({
  id: n.int32(),
  helloId: n.int32(),
  goodbyeId: n.int32(),
  annoyedId: n.int32(),
  ackId: n.int32()
});

export const PageTextMaterial = DbcSchema({
  id: n.int32(),
  name: StringRefSchema
});

export const PaperDollItemFrame = DbcSchema({
  id: n.int32(),
  sortIcon: StringRefSchema,
  slotNumber: n.int32()
});

export const PetLoyalty = DbcSchema({
  id: n.int32(),
  ...LocalizedStringRef('name')
});

export const PetPersonality = DbcSchema({
  id: n.int32(),
  ...LocalizedStringRef('name'),
  ...ArrayField('happinessThreshold', n.int32(), 3),
  ...ArrayField('happinessDamage', n.float(), 3),
  ...ArrayField('damageModifier', n.int32(), 3)
});

export const QuestInfo = DbcSchema({
  id: n.int32(),
  ...LocalizedStringRef('name')
});

export const QuestSort = DbcSchema({
  id: n.int32(),
  ...LocalizedStringRef('name')
});

export const Resistances = DbcSchema({
  id: n.int32(),
  flags: n.int32(),
  fizzleSoundId: n.int32(),
  ...LocalizedStringRef('name')
});

export const ServerMessages = DbcSchema({
  id: n.int32(),
  ...LocalizedStringRef('text')
});

export const SkillLine = DbcSchema({
  id: n.int32(),
  categoryId: n.int32(),
  skillCostsId: n.int32(),
  ...LocalizedStringRef('name'),
  ...LocalizedStringRef('description'),
  spellIconId: n.int32()
});

export const SkillLineAbility = DbcSchema({
  id: n.int32(),
  skillLine: n.int32(),
  spell: n.int32(),
  raceMask: n.int32(),
  classMask: n.int32(),
  excludeRace: n.int32(),
  excludeClass: n.int32(),
  minSkillLikeRank: n.int32(),
  supersededBySpellId: n.int32(),
  acquireMethod: n.int32(),
  trivialSkillLineRankHigh: n.int32(),
  trivialSkillLineRankLow: n.int32(),
  ...ArrayField('charcterPoints', n.int32(), 2),
  numSkillUps: n.int32()
});

export const SkillLineCategory = DbcSchema({
  id: n.int32(),
  ...LocalizedStringRef('name'),
  sortIndex: n.int32()
});

export const SkillRaceClassInfo = DbcSchema({
  id: n.int32(),
  skillId: n.int32(),
  raceMask: n.int32(),
  classMask: n.int32(),
  flags: n.int32(),
  minLevel: n.int32(),
  skillTierId: n.int32(),
  skillCostIndex: n.int32()
});

export const SkillTiers = DbcSchema({
  id: n.int32(),
  ...ArrayField('cost', n.int32(), 16),
  ...ArrayField('value', n.int32(), 16)
});

export const SoundAmbience = DbcSchema({
  id: n.int32(),
  ...ArrayField('ambienceId', n.int32(), 2)
});

export const SoundCharacterMacroLines = DbcSchema({
  id: n.int32(),
  category: n.int32(),
  sexId: n.int32(),
  raceId: n.int32(),
  soundId: n.int32()
});

export const SoundEntries = DbcSchema({
  id: n.int32(),
  soundType: n.int32(),
  name: StringRefSchema,
  ...ArrayField('file', StringRefSchema, 10),
  ...ArrayField('freq', n.int32(), 10),
  directoryBase: StringRefSchema,
  volume: n.float(),
  flags: n.int32(),
  distanceMin: n.float(),
  distanceCutoff: n.float(),
  soundEntriesAdvancedId: n.int32()
});

export const SoundProviderPreferences = DbcSchema({
  id: n.int32(),
  description: StringRefSchema,
  flags: n.int32(),
  EAXEnvironmentSelection: n.int32(),
  EAXDecayTime: n.float(),
  EAX2EnvironmentSize: n.float(),
  EAX2EnvironmentDiffusion: n.float(),
  EAX2Room: n.int32(),
  EAX2RoomHF: n.int32(),
  EAX2DecayHFRatio: n.float(),
  EAX2Reflections: n.int32(),
  EAX2ReflectionsDelay: n.float(),
  EAX2Reverb: n.int32(),
  EAX2ReverbDelay: n.float(),
  EAX2RoomRolloff: n.float(),
  EAX2AirAbsorption: n.float(),
  EAX3RoomLF: n.int32(),
  EAX3DecayLFRatio: n.float(),
  EAX3EchoTime: n.float(),
  EAX3EchoDepth: n.float(),
  EAX3ModulationTime: n.float(),
  EAX3ModulationDepth: n.float(),
  EAX3HFReference: n.float(),
  EAX3LFReference: n.float()
});

export const SoundWaterType = DbcSchema({
  id: n.int32(),
  liquidTypeId: n.int32(),
  fluidSpeed: n.int32(),
  soundId: n.int32()
});

export const SpamMessages = DbcSchema({
  id: n.int32(),
  text: StringRefSchema
});

export const Spell = DbcSchema({
  id: n.int32(),
  school: n.int32(),
  category: n.int32(),
  castUi: n.int32(),
  dispelType: n.int32(),
  mechanic: n.int32(),
  ...ArrayField('attribute', n.int32(), 5),
  shapeshiftMask: n.int32(),
  shapeshiftExclude: n.int32(),
  targets: n.int32(),
  targetCreatureType: n.int32(),
  requiresSpellFocus: n.int32(),
  casterAuraStat: n.int32(),
  targetAuraState: n.int32(),
  castingTimeIndex: n.int32(),
  recoveryTime: n.int32(),
  categoryRecoveryTime: n.int32(),
  interruptFlags: n.int32(),
  auraInterruptFlags: n.int32(),
  channelInterruptFlags: n.int32(),
  procTypeMask: n.int32(),
  procChance: n.int32(),
  procCharges: n.int32(),
  maxLevel: n.int32(),
  baseLevel: n.int32(),
  spellLevel: n.int32(),
  durationIndex: n.int32(),
  powerType: n.int32(),
  manaCost: n.int32(),
  manaPerLevel: n.int32(),
  manaPerSecond: n.int32(),
  manaPerSecondPerLevel: n.int32(),
  rangeIndex: n.int32(),
  speed: n.float(),
  modalNextSpell: n.int32(),
  stackAmount: n.int32(),
  ...ArrayField('totem', n.int32(), 2),
  ...ArrayField('reagent', n.int32(), 8),
  ...ArrayField('reagentCount', n.int32(), 8),
  equippedItemClass: n.int32(),
  equippedItemSubClassMask: n.int32(),
  equippedItemInventoryTypeMask: n.int32(),
  ...ArrayField('effect', n.int32(), 3),
  ...ArrayField('effectDieSides', n.int32(), 3),
  ...ArrayField('effectBaseDice', n.int32(), 3),
  ...ArrayField('effectDicePerLevel', n.int32(), 3),
  ...ArrayField('effectRealPointsPerLevel', n.float(), 3),
  ...ArrayField('effectBasePoints', n.int32(), 3),
  ...ArrayField('effectMechanic', n.int32(), 3),
  ...ArrayField('effectImplicitTargetA', n.int32(), 3),
  ...ArrayField('effectImplicitTargetB', n.int32(), 3),
  ...ArrayField('effectRadiusIndex', n.int32(), 3),
  ...ArrayField('effectApplyAura', n.int32(), 3),
  ...ArrayField('effectAmplitude', n.int32(), 3),
  ...ArrayField('effectMultipleValue', n.float(), 3),
  ...ArrayField('effectChainTarget', n.int32(), 3),
  ...ArrayField('effectItemType', n.int32(), 3),
  ...ArrayField('effectMiscValue', n.int32(), 3),
  ...ArrayField('effectTriggerSpell', n.int32(), 3),
  ...ArrayField('effectPointsPerCombo', n.float(), 3),
  ...ArrayField('spellVisualId', n.int32(), 2),
  spellIconId: n.int32(),
  activeIconId: n.int32(),
  spellPriority: n.int32(),
  ...LocalizedStringRef('name'),
  ...LocalizedStringRef('subtext'),
  ...LocalizedStringRef('description'),
  ...LocalizedStringRef('auraDescription'),
  manaCostPercentage: n.int32(),
  startRecoveryCategory: n.int32(),
  startRecoveryTime: n.int32(),
  maxTargetLevel: n.int32(),
  spellClassSet: n.int32(),
  ...ArrayField('spellClassMask', n.int32(), 2),
  maxTargets: n.int32(),
  damageType: n.int32(),
  preventionType: n.int32(),
  stanceBarOrder: n.int32(),
  ...ArrayField('damageMultiplier', n.float(), 3),
  minFactionId: n.int32(),
  minReputation: n.int32(),
  requiredAuraVision: n.int32()
});

export const SpellCastTimes = DbcSchema({
  id: n.int32(),
  base: n.int32(),
  perLevel: n.int32(),
  minimum: n.int32()
});

export const SpellCategory = DbcSchema({
  id: n.int32(),
  flags: n.int32()
});

export const SpellChainEffects = DbcSchema({
  id: n.int32(),
  averageSegmentLength: n.float(),
  width: n.float(),
  noiseScale: n.float(),
  textureCoordScale: n.float(),
  segmentDuration: n.int32(),
  segmentDelay: n.int32(),
  texture: StringRefSchema
});

export const SpellDispelType = DbcSchema({
  id: n.int32(),
  ...LocalizedStringRef('name'),
  showOnAuraTooltip: n.int32(),
  internalName: StringRefSchema
});

export const SpellDuration = DbcSchema({
  id: n.int32(),
  base: n.int32(),
  perLevel: n.int32(),
  max: n.int32()
});

export const SpellEffectCameraShakes = DbcSchema({
  id: n.int32(),
  ...ArrayField('cameraShake', n.int32(), 3)
});

export const SpellEffectNames = DbcSchema({
  id: n.uint32(),
  ...LocalizedStringRef('name')
});

export const SpellFocusObject = DbcSchema({
  id: n.int32(),
  ...LocalizedStringRef('name')
});

export const SpellIcon = DbcSchema({
  id: n.int32(),
  texture: StringRefSchema
});

export const SpellItemEnchantment = DbcSchema({
  id: n.int32(),
  ...ArrayField('effect', n.int32(), 3),
  ...ArrayField('pointsMin', n.int32(), 3),
  ...ArrayField('pointsMax', n.int32(), 3),
  ...ArrayField('effectArg', n.int32(), 3),
  ...LocalizedStringRef('name'),
  itemVisual: n.int32(),
  flags: n.int32()
});

export const SpellMechanic = DbcSchema({
  id: n.int32(),
  unknown: n.int32()
});

export const SpellRadius = DbcSchema({
  id: n.int32(),
  radius: n.float(),
  radiusPerLevel: n.int32(),
  radiusMax: n.int32()
});

export const SpellRange = DbcSchema({
  id: n.int32(),
  rangeMin: n.float(),
  rangeMax: n.float(),
  flags: n.int32(),
  ...LocalizedStringRef('name'),
  ...LocalizedStringRef('shortName')
});

export const SpellShapeshiftForm = DbcSchema({
  id: n.int32(),
  bonusActionBar: n.int32(),
  ...LocalizedStringRef('name'),
  flags: n.int32(),
  creatureType: n.int32(),
  combatRoundTime: n.int32()
});

export const SpellVisual = DbcSchema({
  id: n.int32(),
  precastKit: n.int32(),
  castKit: n.int32(),
  impactKit: n.int32(),
  stateKit: n.int32(),
  stateDoneKit: n.int32(),
  channelKit: n.int32(),
  hasMissile: n.int32(),
  missileModel: n.int32(),
  missilePathType: n.int32(),
  missileDestinationAttachment: n.int32(),
  missileSound: n.int32(),
  animationEventSoundId: n.int32(),
  flags: n.int32(),
  casterImpactKit: n.int32(),
  targetImpactKit: n.int32()
});

export const SpellVisualEffectName = DbcSchema({
  id: n.int32(),
  name: StringRefSchema,
  fileName: StringRefSchema,
  areaEffectSize: n.int32(),
  scale: n.float()
});

export const SpellVisualKit = DbcSchema({
  id: n.int32(),
  startAnimationId: n.int32(),
  animationId: n.int32(),
  animationKitId: n.int32(),
  headEffect: n.int32(),
  chestEffect: n.int32(),
  baseEffect: n.int32(),
  leftHandEffect: n.int32(),
  rightHandEffect: n.int32(),
  breathEffect: n.int32(),
  leftWeaponEffect: n.int32(),
  rightWeaponEffect: n.int32(),
  ...ArrayField('specialEffect', n.int32(), 3),
  worldEffect: n.int32(),
  soundId: n.int32(),
  shakeId: n.int32(),
  ...ArrayField('characterProc', n.int32(), 4),
  ...ArrayField('paramZero', n.float(), 4),
  ...ArrayField('paramOne', n.float(), 4),
  ...ArrayField('paramTwo', n.float(), 4),
  flags: n.int32()
});

export const SpellVisualPrecastTransitions = DbcSchema({
  id: n.int32(),
  loadAnimation: StringRefSchema,
  holdAnimation: StringRefSchema
});

export const StableSlotPrices = DbcSchema({
  id: n.int32(),
  cost: n.int32()
});

export const Startup_Strings = DbcSchema({
  id: n.int32(),
  name: StringRefSchema,
  ...LocalizedStringRef('string')
});

export const Stationery = DbcSchema({
  id: n.int32(),
  itemId: n.int32(),
  texture: StringRefSchema,
  flags: n.int32()
});

export const Talent = DbcSchema({
  id: n.int32(),
  specId: n.int32(),
  row: n.int32(),
  col: n.int32(),
  ...ArrayField('spellRank', n.int32(), 9),
  ...ArrayField('prerequisiteTalent', n.int32(), 3),
  ...ArrayField('prerequisiteRank', n.int32(), 3),
  flags: n.int32(),
  requiredSpellId: n.int32()
});

export const TalentTab = DbcSchema({
  id: n.int32(),
  ...LocalizedStringRef('name'),
  spellIconId: n.int32(),
  raceMask: n.int32(),
  classMask: n.int32(),
  orderIndex: n.int32(),
  background: StringRefSchema
});

export const TaxiNodes = DbcSchema({
  id: n.int32(),
  continentId: n.int32(),
  ...Position,
  ...LocalizedStringRef('name'),
  ...ArrayField('mountCreatureId', n.int32(), 2)
});

export const TaxiPath = DbcSchema({
  id: n.int32(),
  fromNode: n.int32(),
  toNode: n.int32(),
  cost: n.int32()
});

export const TaxiPathNode = DbcSchema({
  id: n.int32(),
  pathId: n.int32(),
  nodeIndex: n.int32(),
  continentId: n.int32(),
  ...Position,
  flags: n.int32(),
  delay: n.int32()
});

export const TerrainType = DbcSchema({
  id: n.int32(),
  name: StringRefSchema,
  runSpellVisualId: n.int32(),
  walkSpellVisualId: n.int32(),
  soundId: n.int32(),
  flags: n.int32()
});

export const TerrainTypeSounds = DbcSchema({
  id: n.int32()
});

export const TransportAnimation = DbcSchema({
  id: n.int32(),
  transportId: n.int32(),
  timeIndex: n.int32(),
  ...Position,
  animationSequenceId: n.int32()
});

export const VocalUISounds = DbcSchema({
  id: n.int32(),
  vocalUi: n.int32(),
  raceId: n.int32(),
  normalMaleSoundId: n.int32(),
  normalFemaleSoundId: n.int32(),
  drunkMaleSoundId: n.int32(),
  drunkFemaleSoundId: n.int32()
});

export const WeaponImpactSounds = DbcSchema({
  id: n.int32(),
  weaponSubclassId: n.int32(),
  parrySoundType: n.uint32(),
  ...ArrayField('impactSoundId', n.int32(), 10),
  ...ArrayField('critSoundId', n.int32(), 10)
});

export const WMOAreaTable = DbcSchema({
  id: n.int32(),
  wmoId: n.int32(),
  nameSetId: n.int32(),
  wmoGroupId: n.int32(),
  soundProviderId: n.int32(),
  underwaterSoundProviderId: n.int32(),
  ambienceId: n.int32(),
  zoneMusicId: n.int32(),
  introSoundId: n.int32(),
  flags: n.int32(),
  areaTableId: n.int32(),
  ...LocalizedStringRef('name')
});

export const WorldMapArea = DbcSchema({
  id: n.int32(),
  continentId: n.int32(),
  areaId: n.int32(),
  name: StringRefSchema,
  locLeft: n.float(),
  locRight: n.float(),
  locTop: n.float(),
  locBottom: n.float()
});

export const WorldMapContinent = DbcSchema({
  id: n.int32(),
  continentId: n.int32(),
  left: n.int32(),
  right: n.int32(),
  top: n.int32(),
  bottom: n.int32(),
  offsetX: n.float(),
  offsetY: n.float(),
  scale: n.float(),
  taxiMinX: n.float(),
  taxiMinY: n.float(),
  taxiMaxX: n.float(),
  taxiMaxY: n.float()
});

export const WorldMapOverlay = DbcSchema({
  id: n.int32(),
  worldMapAreaId: n.int32(),
  ...ArrayField('areaId', n.int32(), 4),
  mapPointX: n.int32(),
  mapPointY: n.int32(),
  texture: StringRefSchema,
  textureWidth: n.int32(),
  textureHeight: n.int32(),
  offsetX: n.int32(),
  offsetY: n.int32(),
  hitRectTop: n.int32(),
  hitRectLeft: n.int32(),
  hitRectBottom: n.int32(),
  hitRectRight: n.int32()
});

export const WorldSafeLocs = DbcSchema({
  id: n.int32(),
  continentId: n.int32(),
  ...Position,
  ...LocalizedStringRef('name')
});

export const WorldStateUI = DbcSchema({
  id: n.int32(),
  mapId: n.int32(),
  areaId: n.int32(),
  icon: StringRefSchema,
  ...LocalizedStringRef('text'),
  ...LocalizedStringRef('tooltip'),
  state: n.int32(),
  stateVariable: n.int32(),
  type: n.int32(),
  dynamicIcon: StringRefSchema,
  ...LocalizedStringRef('dynamicTooltip'),
  extendedUi: StringRefSchema,
  ...ArrayField('extendedUiVariable', n.int32(), 3)
});

export const WowError_Strings = DbcSchema({
  id: n.int32(),
  errorName: StringRefSchema,
  ...LocalizedStringRef('errorText')
});

export const ZoneIntroMusicTable = DbcSchema({
  id: n.int32(),
  name: StringRefSchema,
  soundId: n.int32(),
  priority: n.int32(),
  minDelayMinutes: n.int32()
});

export const ZoneMusic = DbcSchema({
  id: n.int32(),
  name: StringRefSchema,
  silenceIntervalMinDay: n.int32(),
  silenceIntervalMaxDay: n.int32(),
  silenceIntervalMinNight: n.int32(),
  silenceIntervalMaxNight: n.int32(),
  soundsDay: n.int32(),
  soundsNight: n.int32()
});
