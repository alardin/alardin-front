/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react-native/no-inline-styles */

// Copy from https://github.com/bang9/react-native-wheel-time-picker-example
// Thanks to bang9

import React, { useEffect } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import {
  BUTTON_HEIGHT,
  fillEmpty,
  GAP,
  getCenterPositionFromIndex,
  getIndexFromOffset,
  HOUR_ITEMS,
  MERIDIEM_ITEMS,
  MINUTE_ITEMS,
} from '../../../../utils/timePickerUtils';
import { debounce } from 'loadsh';
import Text from '../../../atoms/text/Text';

const styles = StyleSheet.create({
  gap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: GAP,
  },
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    marginVertical: 20,
  },
  scrollView: {
    left: 0,
    right: 0,
    position: 'absolute',
  },
  button: {
    height: BUTTON_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  buttonLabel: {
    color: '#4F4DE1',
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Pretendard-Regular',
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
  overlayVisibleView: {
    width: '100%',
    height: BUTTON_HEIGHT,
    flexDirection: 'row',
    backgroundColor: '#F2F2FF',
    borderRadius: 8,
  },
  overlayVisibleViewInner: {
    flex: 1,
  },
});

const isPM = date => date.getHours() >= 12;

const TimePicker = ({ value, onChange, width, buttonHeight, visibleCount }) => {
  if (visibleCount % 2 === 0) throw new Error('visibleCount must be odd');
  const dateString = value.toTimeString();
  const ITEMS = [
    {
      key: 'meridiem',
      items: MERIDIEM_ITEMS,
    },
    {
      key: 'hour',
      items: HOUR_ITEMS,
    },
    {
      key: 'minute',
      items: MINUTE_ITEMS,
    },
  ];

  const refs = React.useRef(
    Array.from({ length: 3 }).map(() => React.createRef()),
  );
  const animatedValues = React.useRef(
    Array.from({ length: 3 }).map(() => new Animated.Value(0)),
  );

  const getScrollProps = (index, keyType, items) => {
    const onScrollStop = debounce(
      offsetY => {
        const date = new Date(value.getTime());
        const itemIdx = getIndexFromOffset(offsetY);

        if (keyType === 'meridiem') {
          const currValueIsPM = isPM(date);
          const nextValueIsPM = MERIDIEM_ITEMS[itemIdx] === '오후';
          if (currValueIsPM && !nextValueIsPM) {
            date.setHours(date.getHours() - 12);
          }
          if (!currValueIsPM && nextValueIsPM) {
            date.setHours(date.getHours() + 12);
          }
        }
        if (keyType === 'hour') {
          const hour = Number(HOUR_ITEMS[itemIdx]);

          if (isPM(date)) {
            const isNoon = hour === 12;
            if (isNoon) {
              date.setHours(12);
            } else {
              date.setHours(hour + 12);
            }
          } else {
            const isMidnight = hour === 12;
            if (isMidnight) {
              date.setHours(0);
            } else {
              date.setHours(hour);
            }
          }
        }

        if (keyType === 'minute') {
          date.setMinutes(Number(MINUTE_ITEMS[itemIdx]));
        }

        onChange(date);
      },
      200,
      { leading: false, trailing: true },
    );

    return {
      key: keyType,
      index,
      items,
      showsVerticalScrollIndicator: false,
      contentContainerStyle: styles.scrollView,
      ref: refs.current[index],
      onScrollBeginDrag: () => {
        onScrollStop.cancel();
      },
      onScrollEndDrag: e => {
        onScrollStop.cancel();
        onScrollStop(e.nativeEvent.contentOffset.y);
      },
      onMomentumScrollBegin: () => {
        onScrollStop.cancel();
      },
      onMomentumScrollEnd: e => {
        onScrollStop.cancel();
        onScrollStop(e.nativeEvent.contentOffset.y);
      },
      getOnPress: item => () => {
        const targetIdx = items.indexOf(item);
        if (targetIdx === -1) return;

        const CENTER_POSITION = getCenterPositionFromIndex(targetIdx);
        onScrollStop(CENTER_POSITION);
        onScrollStop.flush();
      },
      animatedValue: animatedValues.current[index],
      scrollEventThrottle: 16,
    };
  };

  const scrollProps = React.useMemo(() => {
    return ITEMS.map(({ key, items }, index) =>
      getScrollProps(index, key, items),
    );
  }, [dateString]);

  useEffect(() => {
    const meridiem = isPM(value) ? '오후' : '오전';
    const hour = String(
      isPM(value) ? value.getHours() - 12 : value.getHours(),
    ).padStart(2, '0');
    const minute = String(value.getMinutes()).padStart(2, '0');

    const matchIndex = [
      MERIDIEM_ITEMS.indexOf(meridiem),
      HOUR_ITEMS.indexOf(hour),
      MINUTE_ITEMS.indexOf(minute),
    ];

    scrollProps.forEach((props, index) => {
      props.ref.current.scrollTo({
        y: getCenterPositionFromIndex(matchIndex[index]),
      });
    });
  }, [dateString]);

  return (
    <View>
      <Text>시간</Text>
      <View
        style={[
          styles.container,
          { width, height: visibleCount * buttonHeight },
        ]}>
        {scrollProps.map((props, scrollViewIndex) => {
          const renderItems = fillEmpty(visibleCount, props.items);

          return (
            <ScrollView
              nestedScrollEnabled
              {...props}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: { contentOffset: { y: props.animatedValue } },
                  },
                ],
                { useNativeDriver: false },
              )}>
              {renderItems.map((item, index) => {
                const position = getCenterPositionFromIndex(
                  props.items.indexOf(item),
                );

                const opacity = props.animatedValue.interpolate({
                  inputRange: [
                    position - BUTTON_HEIGHT,
                    position,
                    position + BUTTON_HEIGHT,
                  ],
                  outputRange: [0.3, 1, 0.3],
                  extrapolate: 'clamp',
                });

                return (
                  <Button
                    key={index}
                    style={{ opacity }}
                    label={item}
                    onPress={props.getOnPress(item)}
                  />
                );
              })}
            </ScrollView>
          );
        })}
        <OverlayView />
      </View>
    </View>
  );
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Button = ({ style, label, onPress }) => {
  return (
    <AnimatedPressable style={style} onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </View>
    </AnimatedPressable>
  );
};

const OverlayView = () => {
  return (
    <View
      pointerEvents={'none'}
      style={[StyleSheet.absoluteFill, styles.overlay]}>
      <View style={styles.overlayVisibleView}>
        <View style={styles.overlayVisibleViewInner} />
        <GapView />
        <View style={styles.overlayVisibleViewInner} />
        <GapView>
          <Text
            style={{
              color: '#172E48',
              fontSize: 28,
              fontWeight: '700',
              paddingBottom: 4,
            }}>
            {':'}
          </Text>
        </GapView>
        <View style={styles.overlayVisibleViewInner} />
      </View>
    </View>
  );
};

const GapView = ({ children }) => {
  return <View style={styles.gap}>{children}</View>;
};

export default TimePicker;
