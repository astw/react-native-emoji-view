import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from "react-native";
import ScrollableTabView from 'react-native-scrollable-tab-view';
import emoji from "./emoji.json";
import categories from "./categories.json";

const { width } = Dimensions.get( "window" );
const itemWidth = width / 7;

const emojiData = Object.keys( categories ).map( cate => {
	const pageData = categories[ cate ];
	const pageCount = pageData.length / 35;
	let pages = [];
	for ( let i = 0; i < pageCount; i++ ) {
		pages.push( {
			key: cate + i,
			data: pageData.slice( i * 35, i * 35 + 35 ).map( name => {
				return { key: emoji[ name ] }
			} )
		} );
	}
	return {
		key: cate,
		pages: pages
	}
} );

function TabDot( props ) {
	return <View style={{ flexDirection: "row", justifyContent: "center", height: 30, alignItems: "center" }}>
		{props.tabs.map( ( tab, page ) => {
			const activeStyle = props.activeTab === page ? { backgroundColor: "#a8a8a8" } : null;
			return <View key={tab} style={[ styles.dot, activeStyle ]}/>
		} )}
	</View>
}

export default class EmojiView extends React.Component {
	static defaultProps = {
		onSelect: () => null,
	};

	constructor( props ) {
		super( props );
		this.state = {
			current: emojiData[ 0 ].key,
		};
	}

	shouldComponentUpdate( nextProps, nextState ) {
		if ( nextState.current !== this.state.current ) return true;
		return nextProps.visible !== this.props.visible;
	}

	renderItem( { item } ) {
		return <TouchableOpacity
			style={{ width: itemWidth, height: 40, justifyContent: "center", alignItems: "center" }}
			onPress={() => this.props.onSelect( item.key )}>
			<Text style={{ color: "#000", fontSize: 20 }}>{item.key}</Text>
		</TouchableOpacity>
	}

	renderPage( page ) {
		return <View tabLabel={page.key} key={page.key} style={{ flex: 1 }}>
			<FlatList numColumns={7} data={page.data} renderItem={this.renderItem.bind( this )}/>
		</View>
	}

	render() {
		return <View style={{ height: 265, display: this.props.visible ? "flex" : "none" }}>
			<View style={{ height: 230 }}>
				{emojiData.map( ( cate ) => {
					return cate.key === this.state.current ?
						<ScrollableTabView renderTabBar={TabDot} key={cate.key} tabBarPosition="bottom"
										   style={{ backgroundColor: "#fff" }}>
							{cate.pages.map( page => this.renderPage( page ) )}
						</ScrollableTabView> : null;
				} )}
			</View>
			{this.renderTabBar()}
		</View>
	}

	renderTabBar() {
		return <View style={{ backgroundColor: "#ededed" }}>
			<ScrollView style={{ height: 35 }} horizontal={true} showsHorizontalScrollIndicator={false}>
				{emojiData.map( cate => {
					const activeStyle = cate.key === this.state.current ? { backgroundColor: "#fff" } : null;
					return <TouchableOpacity key={cate.key} onPress={() => {
						this.setState( { current: cate.key } );
					}}>
						<Text key={cate.key} style={[ styles.cateBtn, activeStyle ]}>{cate.key}</Text>
					</TouchableOpacity>
				} )}
			</ScrollView>
		</View>
	}

}

const styles = StyleSheet.create( {
	dot: {
		width: 8, height: 8, margin: 5,
		backgroundColor: "#d7d7d7",
		borderRadius: 5
	},
	back: {
		position: "absolute",
		bottom: 0,
		right: 0,
		justifyContent: "center",
		alignItems: "center",
		width: itemWidth,
		height: 40
	},
	cateBtn: {
		width: 50,
		height: 35,
		textAlign: "center",
		textAlignVertical: "center",
		borderLeftWidth: 0.5,
		borderColor: "#fff",
		backgroundColor: "#ededed"
	}
} );