import AmfSquareLogo from 'assets/images/amf_square.png'
import AnimalCharityEvaluatorsLogo from 'assets/images/animal_charity_evaluators.png'
import AnimalWellFate1 from 'assets/images/animal_wellfare_postcard_1.png'
import AnimalWellFate2 from 'assets/images/animal_wellfare_postcard_2.png'
import BurnLogo from 'assets/images/burn.png'
import C180Logo from 'assets/images/c180.png'
import CatfLogo from 'assets/images/catf.jpg'
import CharmLogo from 'assets/images/charm.png'
import ClimatePostcard1 from 'assets/images/climate_postcard_1.png'
import ClimatePostcard2 from 'assets/images/climate_postcard_2.png'
import ClimeworksLogo from 'assets/images/climeworks.png'
import EvergreenLogo from 'assets/images/evergreen.png'
import FaunalyticsLogo from 'assets/images/faunalytics.png'
import FoundersPledgeLogo from 'assets/images/founders_pledge.png'
import GivewellLogo from 'assets/images/givewell.png'
import GlobalHealthPostcard1 from 'assets/images/global_health_postcard_1.png'
import GlobalHealthPostcard2 from 'assets/images/global_health_postcard_2.png'
import HkiLogo from 'assets/images/hki.png'
import NewIncentivesLogo from 'assets/images/new_incentives.png'
import TheHumanLeagueLogo from 'assets/images/the_human_league.png'
import TradewaterLogo from 'assets/images/tradewater.png'
import WildAnimalInitiativeLogo from 'assets/images/wild_animal_initiative.jpg'

export const ORG_IMAGES: Record<string, string> = {
  'assets/images/givewell.png': GivewellLogo,
  'assets/images/amf_square.png': AmfSquareLogo,
  'assets/images/new_incentives.png': NewIncentivesLogo,
  'assets/images/hki.png': HkiLogo,
  'assets/images/founders_pledge.png': FoundersPledgeLogo,
  'assets/images/catf.jpg': CatfLogo,
  'assets/images/c180.png': C180Logo,
  'assets/images/evergreen.png': EvergreenLogo,
  'assets/images/burn.png': BurnLogo,
  'assets/images/climeworks.png': ClimeworksLogo,
  'assets/images/tradewater.png': TradewaterLogo,
  'assets/images/charm.png': CharmLogo,
  'assets/images/animal_charity_evaluators.png': AnimalCharityEvaluatorsLogo,
  'assets/images/the_human_league.png': TheHumanLeagueLogo,
  'assets/images/wild_animal_initiative.jpg': WildAnimalInitiativeLogo,
  'assets/images/faunalytics.png': FaunalyticsLogo,
}

export const getOrganisationLogo = (imgUrl: string): string => {
  return ORG_IMAGES[imgUrl]
}

export const CAUSES_IMAGES: Record<string, string> = {
  'assets/images/global_health_postcard_1.png': GlobalHealthPostcard1,
  'assets/images/global_health_postcard_2.png': GlobalHealthPostcard2,
  'assets/images/climate_postcard_1.png': ClimatePostcard1,
  'assets/images/climate_postcard_2.png': ClimatePostcard2,
  'assets/images/animal_wellfare_postcard_1.png': AnimalWellFate1,
  'assets/images/animal_wellfare_postcard_2.png': AnimalWellFate2,
}

export const getCausesPoster = (imgUrls: string | string[]): string => {
  // eslint-disable-next-line no-console
  console.log(imgUrls)
  const url =
    typeof imgUrls === 'string'
      ? imgUrls
      : imgUrls[Math.floor(Math.random() * imgUrls.length)]
  // eslint-disable-next-line no-console
  console.log(url, CAUSES_IMAGES[url])
  return CAUSES_IMAGES[url]
}
