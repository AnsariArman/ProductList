import React from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from 'react-native';

const CustomModal = ({
    toggleModalVisibilty,
    isModalVisible,
    onPressGallery,
    onPressTakePhoto,
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => {
                toggleModalVisibilty()
            }}>

            <TouchableOpacity onPress={() => { toggleModalVisibilty() }} style={styles.centeredView} >
            </TouchableOpacity>

            <View style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                backgroundColor: "white"
            }}>

                <Text style={{
                    marginTop: 15,
                    marginLeft: 15,
                    color: "black",
                    fontSize: 18,
                    fontWeight: "700"
                }}>
                    Choose Liabrary
                </Text>

                <View
                    style={{
                        marginTop: 30,
                        marginBottom: 20,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginHorizontal: 15,
                    }}>

                    <TouchableOpacity
                        onPress={onPressTakePhoto}
                        style={{
                            height: 30,
                            justifyContent: "center", alignItems: "center",
                        }}>
                        <Text style={{
                            color: "black",
                            fontSize: 16,
                            fontWeight: "500"
                        }}>
                            Take a photo
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={onPressGallery}
                        style={{
                            height: 30,
                            justifyContent: "center", alignItems: "center",
                        }}>
                        <Text style={{
                            color: "black",
                            fontSize: 16,
                            fontWeight: "500"
                        }}>
                            Choose From Gallery
                        </Text>
                    </TouchableOpacity>

                </View>


            </View>

        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: "#00000090",
    },
});

export default CustomModal;