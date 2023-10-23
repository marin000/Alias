import { InterstitialAd, AdEventType, TestIds, RewardedAd, RewardedAdEventType } from 'react-native-google-mobile-ads';
import config from '../config/config';
const { intAdd, reward } = config;
 
const interstitialId = __DEV__ ? TestIds.INTERSTITIAL : intAdd;
const interstitial = InterstitialAd.createForAdRequest(interstitialId, {
  requestNonPersonalizedAdsOnly: true
});

const rewardId = __DEV__ ? TestIds.REWARDED : reward;
const rewarded = RewardedAd.createForAdRequest(rewardId, {
  requestNonPersonalizedAdsOnly: true
});

const showInterstitialAd = () => {
  const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
    interstitial.show();
  });
  interstitial.load();
  return unsubscribe;
}

const showRewardedAd = () => {
  const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
    rewarded.show();
  });
  const unsubscribeEarned = rewarded.addAdEventListener(
    RewardedAdEventType.EARNED_REWARD,
    reward => {
      console.log(reward);
    },
  );
  rewarded.load();
  return () => {
    unsubscribeLoaded();
    unsubscribeEarned();
  };
}

export {
  showInterstitialAd,
  showRewardedAd
}