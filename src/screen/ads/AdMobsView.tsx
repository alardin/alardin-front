/* eslint-disable @typescript-eslint/naming-convention */

import React, { useEffect, useRef } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import NativeAdView, {
  AdBadge,
  AdvertiserView,
  HeadlineView,
  IconView,
  NativeAd,
  NativeAdViewProps,
  TaglineView,
} from 'react-native-admob-native-ads';
import { Config } from 'react-native-config';

const styles = StyleSheet.create({
  container: {
    width: '95%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 8,
    marginVertical: 8,
  },
  ads__left: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ads__right: {
    flex: 3,
    paddingHorizontal: 4,
    marginRight: 8,
  },
  ads__text_box: {},
  ads__headline: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  ads__tagline: {
    flex: 1,
    fontSize: 12,
  },
  ads__icon: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  ads__container_icon: {
    borderRadius: 8,
  },
  ads__badge: {
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  ads__badge_box: {
    width: 20,
    height: 15,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'green',
    position: 'relative',
  },
  ads__badge_text: {
    fontSize: 9,
    color: 'green',
    textAlign: 'center',
  },
});

const AdMobsView = () => {
  const adRef = useRef<NativeAdView>();

  useEffect(() => {
    adRef.current?.loadAd();
  }, []);

  return (
    <NativeAdView
      ref={adRef}
      repository="imageAd"
      adUnitID={
        Platform.OS === 'android'
          ? Config.ADMOB_APP_ANDROID_NATIVE_AD_UNIT_ONE
          : Config.ADMOB_APP_IOS_NATIVE_AD_UNIT_ONE
      }>
      <View style={styles.container}>
        <View style={styles.ads__badge}>
          <AdBadge
            style={styles.ads__badge_box}
            textStyle={styles.ads__badge_text}
          />
        </View>
        <View style={styles.ads__left}>
          <IconView style={styles.ads__icon} />
        </View>
        <View style={styles.ads__right}>
          <HeadlineView style={styles.ads__headline} />
          <View style={styles.ads__text_box}>
            <TaglineView style={styles.ads__tagline} />
            <AdvertiserView
              style={{
                fontWeight: 'bold',
                fontSize: 10,
              }}
            />
          </View>
        </View>
      </View>
    </NativeAdView>
  );
};

export default AdMobsView;
