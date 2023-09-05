import { InterstitialAd, AdEventType, TestIds, RewardedAd, RewardedAdEventType } from 'react-native-google-mobile-ads';

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['sport'],
});

const rewarded = RewardedAd.createForAdRequest(TestIds.REWARDED, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['sport'],
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
      console.log('User earned reward of ', reward);
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