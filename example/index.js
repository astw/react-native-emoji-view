import React from "react";
import { TextInput, View } from "react-native";
import EmojiView from "../src";

export default class Example extends React.Component {

	constructor( props ) {
		super( props );
		this.state = {
			text: ""
		};
	}

	onChangeText( text ) {
		this.setState( { text } );
	}

	onSelectEmoji( emoji ) {
		this.setState( { text: this.state.text + emoji } );
	}

	render() {
		return <View style={{ flex: 1 }}>
			<TextInput onChangeText={this.onChangeText.bind( this )} underlineColorAndroid="transparent"
					   value={this.state.text} multiline={true}
					   style={{
						   flex: 1,
						   backgroundColor: "#fff",
						   borderBottomWidth: 1,
						   borderColor: "#ddd",
						   textAlignVertical: "top",
						   fontSize: 18
					   }}/>
			<EmojiView visible={true} onSelect={this.onSelectEmoji.bind( this )}/>
		</View>
	}
}