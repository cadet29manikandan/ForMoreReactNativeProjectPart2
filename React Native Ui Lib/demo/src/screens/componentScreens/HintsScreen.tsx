import React, {Component} from 'react';
import {Alert} from 'react-native';
import {View, Text, Hint, Button, RadioGroup, RadioButton, Switch} from 'react-native-ui-lib'; //eslint-disable-line

const settingsIcon = require('../../assets/icons/settings.png');

type HintScreenProps = {};
type HintScreenState = {
  showHint: boolean;
  useShortMessage: boolean;
  showBottomHint: boolean;
  showIcon: boolean;
  targetPosition: string;
  useTargetFrame?: boolean;
  useSideTip?: boolean;
  showCustomContent?: boolean;
};

export default class HintsScreen extends Component<HintScreenProps, HintScreenState> {
  constructor(props: HintScreenProps) {
    super(props);
    this.state = {
      showHint: true,
      useShortMessage: false,
      showBottomHint: false,
      showIcon: false,
      targetPosition: 'flex-start',
      // useTargetFrame: true,
      useSideTip: false,
      showCustomContent: false
    };
  }

  componentDidMount() {}

  toggleHintPosition = () => {
    this.setState({
      showBottomHint: !this.state.showBottomHint
    });
  };

  render() {
    const {
      showHint,
      showBottomHint,
      showIcon,
      targetPosition,
      useShortMessage,
      useSideTip,
      useTargetFrame,
      showCustomContent
    } = this.state;
    const targetFrame = {x: 140, y: 100, width: 10, height: 10};
    const message = useShortMessage
      ? 'Add other cool and useful stuff.'
      : 'Add other cool and useful stuff through adding apps to your visitors to enjoy.';

    return (
      <View flex>
        <View
          flex
          padding-20
          paddingT-100
          bg-dark80
          style={{zIndex: 10}}
          key={useTargetFrame ? 'withTargetFrame' : 'withElement'}
        >
          {/* <Button bg-purple30 label="Background" style={{position: 'absolute', right: 50, bottom: 100}}/> */}
          <Hint
            visible={showHint}
            // color={Colors.orange30}
            message={message}
            // message={
            //   <Text>
            //     {message}{' '}
            //     <Text style={{textDecorationLine: 'underline'}} onPress={() => {}}>
            //       click here
            //     </Text>
            //   </Text>
            // }
            // messageStyle={{color: 'red'}}
            icon={showIcon ? settingsIcon : undefined}
            // iconStyle={{tintColor: 'red'}}
            // offset={35}
            position={showBottomHint ? Hint.positions.BOTTOM : Hint.positions.TOP}
            useSideTip={useSideTip}
            key={targetPosition}
            targetFrame={useTargetFrame ? targetFrame : undefined}
            // borderRadius={BorderRadiuses.br40}
            // edgeMargins={30}
            // onBackgroundPress={() => this.setState({showHint: !showHint})}
            customContent={
              showCustomContent ? (
                <Text text70 white>
                  Click
                  <Text onPress={() => Alert.alert('custom content :)')} text70BO red40>
                    {' here '}
                  </Text>
                  for more information
                </Text>
              ) : undefined
            }
            testID={'Hint'}
          >
            {!useTargetFrame && (
              <Button
                label={showHint ? 'Hide' : 'Show'}
                onPress={() => this.setState({showHint: !showHint})}
                style={{alignSelf: targetPosition}}
                testID={'Hint.button'}
                // style={{alignSelf: targetPosition, marginLeft: 30}}
                // style={{alignSelf: targetPosition, position: 'absolute', top: 160, left: 100}}
              />
            )}
          </Hint>

          {useTargetFrame && (
            <View
              bg-red50
              style={{
                position: 'absolute',
                top: targetFrame.y,
                left: targetFrame.x,
                width: targetFrame.width,
                height: targetFrame.height
              }}
            />
          )}
        </View>

        <View padding-20 collapsable={false}>
          <RadioGroup
            row
            centerV
            marginB-20
            initialValue={targetPosition}
            onValueChange={(value: string) => this.setState({targetPosition: value})}
          >
            <Text marginR-10>Button Position:</Text>
            <RadioButton value={'flex-start'} label={'Left'} marginR-10/>
            <RadioButton value={'center'} label={'Center'} marginR-10/>
            <RadioButton value={'flex-end'} label={'Right'} marginR-10/>
          </RadioGroup>

          <RadioGroup
            row
            centerV
            marginB-20
            initialValue={useSideTip}
            onValueChange={(value: boolean) => this.setState({useSideTip: value})}
          >
            <Text marginR-10>Tip:</Text>
            <RadioButton value label={'Side Tip'} marginR-10/>
            <RadioButton value={false} label={'Middle Tip'} marginR-10/>
          </RadioGroup>

          <View row centerV marginV-10>
            <Switch value={showBottomHint} onValueChange={this.toggleHintPosition}/>
            <Text marginL-10>Toggle Hint Position</Text>
          </View>

          <View row centerV marginV-10>
            <Switch value={useShortMessage} onValueChange={() => this.setState({useShortMessage: !useShortMessage})}/>
            <Text marginL-10>Toggle Message</Text>
          </View>

          <View row centerV marginV-10>
            <Switch value={showIcon} onValueChange={value => this.setState({showIcon: value})}/>
            <Text marginL-10>Toggle Icon</Text>
          </View>

          <View row centerV marginV-10>
            <Switch value={useTargetFrame} onValueChange={value => this.setState({useTargetFrame: value})}/>
            <Text marginL-10>Use random position</Text>
          </View>

          <View row centerV marginV-10>
            <Switch value={showCustomContent} onValueChange={value => this.setState({showCustomContent: value})}/>
            <Text marginL-10>Show custom content</Text>
          </View>
        </View>
      </View>
    );
  }
}
