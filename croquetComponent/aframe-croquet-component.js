/*
The MIT License (MIT)
Copyright (c) 2019-2023 Nikolai Suslov | Krestianstvo.org and contributors
*/

if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

let Q = Croquet.Constants;
Q.STEP_MS = 1000 / 20;
Q.AVATAR_PREFIX = 'avatar-';
Q.THROTTLED_ATTRIBUTES = ['position', 'rotation', 'rotationquaternion', 'scale'];
Q.SYNCABLE_ATTRIBUTES = [...Q.THROTTLED_ATTRIBUTES, 'multiuser'];
Q.COLORS = ['purple', 'blue', 'green', 'orange', 'yellow', 'red', 'gray', 'white', 'maroon', 'navy', 'aqua', 'lime', 'olive', 'teal', 'fuchsia', 'silver', 'black'];
Q.CAMERA_HEIGHT = 1.6;
Q.INITIAL_PLACEMENT_RADIUS = 2;
Q.FLIP_Z = new THREE.Quaternion(0, -1, 0, 0);
Q.FLIP_Z_INV = new THREE.Quaternion(0, 1, 0, 0);

class RootModel extends Croquet.Model {

    init(options) {
        super.init(options);
        this.children = new Map();
        //Aware of Users
        this.userData = new Map();
        this.spawnPoint = options.spawnPoint || {x: 0, y: 0, z: 0};
        this.seeds = [];
        for (let i=0; i<25; ++i) {
            this.seeds[i] = this.random();
        }
        this.subscribe(this.sessionId, "view-join", this.addUser);
        this.subscribe(this.sessionId, "view-exit", this.deleteUser);
        this.subscribe(this.id, 'onDeleteUser', this.onDeleteUser);
        this.subscribe(this.id, 'add-multiuser-model', this.onComponentAdd);
        this.subscribe(this.id, 'delete-multiuser-model', this.onDeleteComponent);
        this.subscribe(this.id, 'updateOptions', this.updateOptions)


    
    //husky values
    this.FRWvalue = 0;
    this.FLWvalue = 0;
    this.BRWvalue = 0;
    this.BLWvalue = 0;
    this.JJ1value = 0;
    this.JJ2value = 0;
    this.JJ3value = 0;
    this.JJ4value = 0;
    this.JJ5value = 0;
    this.JJ6value = 0;
    this.JJF1value = 0;
    this.JJF2value = 0;
    this.JJF3value = 0;
    this.JJFT1value = 0;
    this.JJFT2value = 0;
    this.JJFT3value = 0;

    //gen3 values
    this.J1value = 0;
    this.J2value = 0;
    this.J3value = 0;
    this.J4value = 0;
    this.J5value = 0;
    this.J6value = 0;
    this.JFvalue = 0;
    this.JLIKvalue = 0;
    this.JLIFvalue = 0;
    this.JRIKvalue = 0;
    this.JRIFvalue = 0;

    this.count = 0;
    this.Mcount = 0;
    this.measurement = "radians";

    this.children = new Map();
        //Aware of Users
        this.userData = new Map();
        this.spawnPoint = options.spawnPoint || {x: 0, y: 0, z: 0};
        this.seeds = [];
        for (let i=0; i<25; ++i) {
            this.seeds[i] = this.random();
        }

    //avatar
    
        const scene = document.querySelector('a-scene');

        // Create a new box entity
        const newBox = document.createElement('a-box');
        
        // Set random position, rotation, and color for the new box
        newBox.setAttribute('position', `0 5 0`);
        newBox.setAttribute('rotation', `${Math.random() * 360} ${Math.random() * 360} ${Math.random() * 360}`);
        newBox.setAttribute('color', `red`);
        newBox.setAttribute('depth', '0.5');  // Set the depth of the box
        newBox.setAttribute('width', '0.5');  // Set the width of the box
        newBox.setAttribute('height', '0.5'); // Set the height of the box

        // Add the new box to the scene
        scene.appendChild(newBox);
      

    
    //husky subscribes
    this.subscribe("FRWIncrease", "mousedown", this.increaseFRW);
    this.subscribe("FRWIncrease", "mouseup", this.mouseUp);
    this.subscribe("FRWDecrease", "mousedown", this.decreaseFRW);
    this.subscribe("FRWDecrease", "mouseup", this.mouseUp);
    this.subscribe("FLWIncrease", "mousedown", this.increaseFLW);
    this.subscribe("FLWIncrease", "mouseup", this.mouseUp);
    this.subscribe("FLWDecrease", "mousedown", this.decreaseFLW);
    this.subscribe("FLWDecrease", "mouseup", this.mouseUp);
    this.subscribe("BRWIncrease", "mousedown", this.increaseBRW);
    this.subscribe("BRWIncrease", "mouseup", this.mouseUp);
    this.subscribe("BRWDecrease", "mousedown", this.decreaseBRW);
    this.subscribe("BRWDecrease", "mouseup", this.mouseUp);
    this.subscribe("BLWIncrease", "mousedown", this.increaseBLW);
    this.subscribe("BLWIncrease", "mouseup", this.mouseUp);
    this.subscribe("BLWDecrease", "mousedown", this.decreaseBLW);
    this.subscribe("BLWDecrease", "mouseup", this.mouseUp);
    this.subscribe("JJ1Increase", "mousedown", this.increaseJJ1);
    this.subscribe("JJ1Increase", "mouseup", this.mouseUp);
    this.subscribe("JJ1Decrease", "mousedown", this.decreaseJJ1);
    this.subscribe("JJ1Decrease", "mouseup", this.mouseUp);
    this.subscribe("JJ2Increase", "mousedown", this.increaseJJ2);
    this.subscribe("JJ2Increase", "mouseup", this.mouseUp);
    this.subscribe("JJ2Decrease", "mousedown", this.decreaseJJ2);
    this.subscribe("JJ2Decrease", "mouseup", this.mouseUp);
    this.subscribe("JJ3Increase", "mousedown", this.increaseJJ3);
    this.subscribe("JJ3Increase", "mouseup", this.mouseUp);
    this.subscribe("JJ3Decrease", "mousedown", this.decreaseJJ3);
    this.subscribe("JJ3Decrease", "mouseup", this.mouseUp);
    this.subscribe("JJ4Increase", "mousedown", this.increaseJJ4);
    this.subscribe("JJ4Increase", "mouseup", this.mouseUp);
    this.subscribe("JJ4Decrease", "mousedown", this.decreaseJJ4);
    this.subscribe("JJ4Decrease", "mouseup", this.mouseUp);
    this.subscribe("JJ5Increase", "mousedown", this.increaseJJ5);
    this.subscribe("JJ5Increase", "mouseup", this.mouseUp);
    this.subscribe("JJ5Decrease", "mousedown", this.decreaseJJ5);
    this.subscribe("JJ5Decrease", "mouseup", this.mouseUp);
    this.subscribe("JJ6Increase", "mousedown", this.increaseJJ6);
    this.subscribe("JJ6Increase", "mouseup", this.mouseUp);
    this.subscribe("JJ6Decrease", "mousedown", this.decreaseJJ6);
    this.subscribe("JJ6Decrease", "mouseup", this.mouseUp);
    this.subscribe("JJF1Increase", "mousedown", this.increaseJJF1);
    this.subscribe("JJF1Increase", "mouseup", this.mouseUp);
    this.subscribe("JJF1Decrease", "mousedown", this.decreaseJJF1);
    this.subscribe("JJF1Decrease", "mouseup", this.mouseUp);
    this.subscribe("JJF2Increase", "mousedown", this.increaseJJF2);
    this.subscribe("JJF2Increase", "mouseup", this.mouseUp);
    this.subscribe("JJF2Decrease", "mousedown", this.decreaseJJF2);
    this.subscribe("JJF2Decrease", "mouseup", this.mouseUp);
    this.subscribe("JJF3Increase", "mousedown", this.increaseJJF3);
    this.subscribe("JJF3Increase", "mouseup", this.mouseUp);
    this.subscribe("JJF3Decrease", "mousedown", this.decreaseJJF3);
    this.subscribe("JJF3Decrease", "mouseup", this.mouseUp);
    this.subscribe("JJFT1Increase", "mousedown", this.increaseJJFT1);
    this.subscribe("JJFT1Increase", "mouseup", this.mouseUp);
    this.subscribe("JJFT1Decrease", "mousedown", this.decreaseJJFT1);
    this.subscribe("JJFT1Decrease", "mouseup", this.mouseUp);
    this.subscribe("JJFT2Increase", "mousedown", this.increaseJJFT2);
    this.subscribe("JJFT2Increase", "mouseup", this.mouseUp);
    this.subscribe("JJFT2Decrease", "mousedown", this.decreaseJJFT2);
    this.subscribe("JJFT2Decrease", "mouseup", this.mouseUp);
    this.subscribe("JJFT3Increase", "mousedown", this.increaseJJFT3);
    this.subscribe("JJFT3Increase", "mouseup", this.mouseUp);
    this.subscribe("JJFT3Decrease", "mousedown", this.decreaseJJFT3);
    this.subscribe("JJFT3Decrease", "mouseup", this.mouseUp);
    this.subscribe("HHIncrease", "mousedown", this.increaseHH);
    this.subscribe("HHIncrease", "mouseup", this.mouseUp);
    this.subscribe("HHDecrease", "mousedown", this.decreaseHH);
    this.subscribe("HHDecrease", "mouseup", this.mouseUp);

    //robot switching subscribes
    this.subscribe("gen3Button", "click", this.gen3ButtonClick);
    this.subscribe("huskyButton", "click", this.huskyButtonClick);

    //gen3 subscribes
    this.subscribe("J1Increase", "mousedown", this.increaseJ1);
    this.subscribe("J1Increase", "mouseup", this.mouseUp);
    this.subscribe("J1Decrease", "mousedown", this.decreaseJ1);
    this.subscribe("J1Decrease", "mouseup", this.mouseUp);
    this.subscribe("J2Increase", "mousedown", this.increaseJ2);
    this.subscribe("J2Increase", "mouseup", this.mouseUp);
    this.subscribe("J2Decrease", "mousedown", this.decreaseJ2);
    this.subscribe("J2Decrease", "mouseup", this.mouseUp);
    this.subscribe("J3Increase", "mousedown", this.increaseJ3);
    this.subscribe("J3Increase", "mouseup", this.mouseUp);
    this.subscribe("J3Decrease", "mousedown", this.decreaseJ3);
    this.subscribe("J3Decrease", "mouseup", this.mouseUp);
    this.subscribe("J4Increase", "mousedown", this.increaseJ4);
    this.subscribe("J4Increase", "mouseup", this.mouseUp);
    this.subscribe("J4Decrease", "mousedown", this.decreaseJ4);
    this.subscribe("J4Decrease", "mouseup", this.mouseUp);
    this.subscribe("J5Increase", "mousedown", this.increaseJ5);
    this.subscribe("J5Increase", "mouseup", this.mouseUp);
    this.subscribe("J5Decrease", "mousedown", this.decreaseJ5);
    this.subscribe("J5Decrease", "mouseup", this.mouseUp);
    this.subscribe("J6Increase", "mousedown", this.increaseJ6);
    this.subscribe("J6Increase", "mouseup", this.mouseUp);
    this.subscribe("J6Decrease", "mousedown", this.decreaseJ6);
    this.subscribe("J6Decrease", "mouseup", this.mouseUp);
    this.subscribe("JFIncrease", "mousedown", this.increaseJF);
    this.subscribe("JFIncrease", "mouseup", this.mouseUp);
    this.subscribe("JFDecrease", "mousedown", this.decreaseJF);
    this.subscribe("JFDecrease", "mouseup", this.mouseUp);
    this.subscribe("JLIKIncrease", "mousedown", this.increaseJLIK);
    this.subscribe("JLIKIncrease", "mouseup", this.mouseUp);
    this.subscribe("JLIKDecrease", "mousedown", this.decreaseJLIK);
    this.subscribe("JLIKDecrease", "mouseup", this.mouseUp);
    this.subscribe("JLIFIncrease", "mousedown", this.increaseJLIF);
    this.subscribe("JLIFIncrease", "mouseup", this.mouseUp);
    this.subscribe("JLIFDecrease", "mousedown", this.decreaseJLIF);
    this.subscribe("JLIFDecrease", "mouseup", this.mouseUp);
    this.subscribe("JRIKIncrease", "mousedown", this.increaseJRIK);
    this.subscribe("JRIKIncrease", "mouseup", this.mouseUp);
    this.subscribe("JRIKDecrease", "mousedown", this.decreaseJRIK);
    this.subscribe("JRIKDecrease", "mouseup", this.mouseUp);
    this.subscribe("JRIFIncrease", "mousedown", this.increaseJRIF);
    this.subscribe("JRIFIncrease", "mouseup", this.mouseUp);
    this.subscribe("JRIFDecrease", "mousedown", this.decreaseJRIF);
    this.subscribe("JRIFDecrease", "mouseup", this.mouseUp);
    this.subscribe("G3HIncrease", "mousedown", this.increaseG3H);
    this.subscribe("G3HIncrease", "mouseup", this.mouseUp);
    this.subscribe("G3HDecrease", "mousedown", this.decreaseG3H);
    this.subscribe("G3HDecrease", "mouseup", this.mouseUp);
    this.subscribe("user", "toggle", this.userToggle);

    //reset button subscribe
    this.subscribe("reset", "reset", this.resetValues);

    //measure button subscribe
    this.subscribe("measure", "toggle", this.measureToggle);

    //other subscribes
    this.subscribe("update", "cameraPosition", this.updateCameraPosition);
    }

    newId() {
        function hex() {
            let r = Math.random();
            return Math.floor(r * 256).toString(16).padStart(2, "0");
        }

        return `${hex()}${hex()}${hex()}${hex()}`;
    }

    updateOptions(newOptions) {
        if (Number.isFinite(newOptions.spawnPoint.x) && Number.isFinite(newOptions.spawnPoint.y) && Number.isFinite(newOptions.spawnPoint.z)) {
            console.debug("RootModel: setting spawn point to", newOptions.spawnPoint);
            this.spawnPoint = newOptions.spawnPoint;
        }
    }

    onDeleteComponent(elID) {

        let component = this.children.get(elID);
        if (component) {
            component.destroy();
            this.children.delete(elID);
            console.debug("RootModel: Model component deleted:", elID, component);
            this.publish(this.id, 'component-deleted', elID);
        }

    }

    onComponentAdd(data) {

        let elID = data.elID;

        if (!this.children.has(elID)) {
            let component = ComponentModel.create(data);
            this.children.set(elID, component);
            console.debug("RootModel: Model component added:", elID, component);
            this.publish(this.id, 'component-added', elID);
        }
    }



    addUser(viewId) {
        let data = this.userData.get(viewId);
        if (data) {
            data.online = true;
            const timeSec = (this.now() - data.start) / 1000;
            console.info(`RootModel: user ${data.color} ${viewId} rejoining & first joined ${timeSec} seconds ago (${this.viewCount} of ${this.userData.size} user(s) online):`, data);
        } else {
            const theta = this.random() * 2 * Math.PI;
            const x = this.spawnPoint.x + Q.INITIAL_PLACEMENT_RADIUS * Math.sin(theta);
            const y = this.spawnPoint.y + Q.CAMERA_HEIGHT;
            const z = this.spawnPoint.z + Q.INITIAL_PLACEMENT_RADIUS * Math.cos(theta);
            const heading = THREE.MathUtils.radToDeg(theta) + 180;
            data = {
                online: true,
                start: this.now(),
                color: Q.COLORS[this.userData.size % Q.COLORS.length],
                position: {x, y, z},
                rotation: {x: 0, y: heading, z: 0},
            };
            this.userData.set(viewId, data);
            console.info(`RootModel: user ${data.color} ${viewId} joining (${this.viewCount} of ${this.userData.size} user(s) online)`, data);
        }

        const elID = Q.AVATAR_PREFIX + viewId;
        let userModel = this.children.get(elID);
        if (userModel) {
            console.debug(`RootModel: user ${data.color} ${viewId} joining; userModel exists:`, userModel);
        } else {
            const options = {
                elID: elID,
                color: data.color,
                // sceneModel: this,
                components: {   // if a coordinate is NaN, use default
                    position: {
                        x: Number.isFinite(data.position?.x) ? data.position.x : 0,
                        y: Number.isFinite(data.position?.y) ? data.position.y : Q.CAMERA_HEIGHT,
                        z: Number.isFinite(data.position?.z) ? data.position.z : -Q.INITIAL_PLACEMENT_RADIUS
                    },
                    rotation: {x: data.rotation?.x || 0, y: data.rotation?.y || 0, z: data.rotation?.z || 0},
                    multiuser: {},
                }
            }
            console.debug(`RootModel: user ${data.color} ${viewId} joining; created userModel:`, options);
            this.onComponentAdd(options)
        }

        this.publish(this.sessionId, 'user-added', viewId);
    }


    deleteUser(viewId) {
        const data = this.userData.get(viewId);
        data.online = false;   // retains data, including color & positions
        const time = this.now() - this.userData.get(viewId)?.start;
        const elID = Q.AVATAR_PREFIX + viewId;
        const userModel = this.children.get(elID);
        if (userModel) {
            data.position = structuredClone(userModel.components.position);
            data.rotation = structuredClone(userModel.components.rotation);
        }
        console.info(`user ${data?.color} ${viewId} left after ${time / 1000} seconds (${this.viewCount} of ${this.userData.size} user(s) online):`, data);
        this.onDeleteComponent(elID)
        this.publish(this.sessionId, 'user-exit', viewId);
        //this.publish(this.viewId, 'onDeleteUser', viewId);
    }

    onDeleteUser(viewId) {
        if (this.userData.has(viewId)) {
            this.userData.delete(viewId);
        }
    }

    mouseUp(){
        this.cancelFuture(this.increaseFRW);
        this.cancelFuture(this.decreaseFRW);
        this.cancelFuture(this.increaseFLW);
        this.cancelFuture(this.decreaseFLW);
        this.cancelFuture(this.increaseBRW);
        this.cancelFuture(this.decreaseBRW);
        this.cancelFuture(this.increaseBLW);
        this.cancelFuture(this.decreaseBLW);
        this.cancelFuture(this.increaseJJ1);
        this.cancelFuture(this.decreaseJJ1);
        this.cancelFuture(this.increaseJJ2);
        this.cancelFuture(this.decreaseJJ2);
        this.cancelFuture(this.increaseJJ3);
        this.cancelFuture(this.decreaseJJ3);
        this.cancelFuture(this.increaseJJ4);
        this.cancelFuture(this.decreaseJJ4);
        this.cancelFuture(this.increaseJJ5);
        this.cancelFuture(this.decreaseJJ5);
        this.cancelFuture(this.increaseJJ6);
        this.cancelFuture(this.decreaseJJ6);
        this.cancelFuture(this.increaseJJF1);
        this.cancelFuture(this.decreaseJJF1);
        this.cancelFuture(this.increaseJJF2);
        this.cancelFuture(this.decreaseJJF2);
        this.cancelFuture(this.increaseJJF3);
        this.cancelFuture(this.decreaseJJF3);
        this.cancelFuture(this.increaseJJFT1);
        this.cancelFuture(this.decreaseJJFT1);
        this.cancelFuture(this.increaseJJFT2);
        this.cancelFuture(this.decreaseJJFT2);
        this.cancelFuture(this.increaseJJFT3);
        this.cancelFuture(this.decreaseJJFT3);
        this.cancelFuture(this.increaseHH);
        this.cancelFuture(this.decreaseHH);
        this.cancelFuture(this.increaseJ1);
        this.cancelFuture(this.decreaseJ1);
        this.cancelFuture(this.increaseJ2);
        this.cancelFuture(this.decreaseJ2);
        this.cancelFuture(this.increaseJ3);
        this.cancelFuture(this.decreaseJ3);
        this.cancelFuture(this.increaseJ4);
        this.cancelFuture(this.decreaseJ4);
        this.cancelFuture(this.increaseJ5);
        this.cancelFuture(this.decreaseJ5);
        this.cancelFuture(this.increaseJ6);
        this.cancelFuture(this.decreaseJ6);
        this.cancelFuture(this.increaseJF);
        this.cancelFuture(this.decreaseJF);
        this.cancelFuture(this.increaseJLIK);
        this.cancelFuture(this.decreaseJLIK);
        this.cancelFuture(this.increaseJLIF);
        this.cancelFuture(this.decreaseJLIF);
        this.cancelFuture(this.increaseJRIK);
        this.cancelFuture(this.decreaseJRIK);
        this.cancelFuture(this.increaseJRIF);
        this.cancelFuture(this.decreaseJRIF);
        this.cancelFuture(this.increaseG3H);
        this.cancelFuture(this.decreaseG3H);
      }
  
      increaseFRW(){
        this.FRWvalue += 0.01;
        console.log(this.FRWvalue);
        husky.setJointValue("front_right_wheel", this.FRWvalue);
        var textEntity = document.getElementById('FRWvalue');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.FRWvalue.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.FRWvalue * (180/3.14)).toFixed(1));
        }
        
        this.future(5).increaseFRW();
      }
  
      increaseFLW(){
        this.FLWvalue += 0.01;
        console.log(this.FLWvalue);
        husky.setJointValue("front_left_wheel", this.FLWvalue);
        var textEntity = document.getElementById('FLWvalue');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.FLWvalue.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.FLWvalue * (180/3.14)).toFixed(1));
        }
       
        this.future(5).increaseFLW();
      }
  
      increaseBRW(){
        this.BRWvalue += 0.01;
        console.log(this.BRWvalue);
        husky.setJointValue("rear_right_wheel", this.BRWvalue);
        var textEntity = document.getElementById('BRWvalue');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.BRWvalue.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.BRWvalue * (180/3.14)).toFixed(1));
        }
        
        this.future(5).increaseBRW();
      }
  
      increaseBLW(){
        this.BLWvalue += 0.01;
        console.log(this.BLWvalue);
        husky.setJointValue("rear_left_wheel", this.BLWvalue);
        var textEntity = document.getElementById('BLWvalue');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.BLWvalue.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.BLWvalue * (180/3.14)).toFixed(1));
        }
       
        this.future(5).increaseBLW();
      }
      increaseJJ1(){
        this.JJ1value += 0.01;
        console.log(this.JJ1value);
        husky.setJointValue("j2n6s300_joint_1", this.JJ1value);
        var textEntity = document.getElementById('JJ1value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.JJ1value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JJ1value * (180/3.14)).toFixed(1));
        }
        
        this.future(5).increaseJJ1();
      }
  
      increaseJJ2(){
        this.JJ2value += 0.01;
        console.log(this.JJ2value);
        husky.setJointValue("j2n6s300_joint_2", this.JJ2value);
        var textEntity = document.getElementById('JJ2value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.JJ2value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JJ2value * (180/3.14)).toFixed(1));
        }
        
        this.future(5).increaseJJ2();
  
        if(this.JJ2value >= 5.5){
          this.JJ2value = 5.5;
        }
      }
      increaseJJ3(){
        this.JJ3value += 0.01;
        console.log(this.JJ3value);
        husky.setJointValue("j2n6s300_joint_3", this.JJ3value);
        var textEntity = document.getElementById('JJ3value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.JJ3value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JJ3value * (180/3.14)).toFixed(1));
        }
        
        this.future(5).increaseJJ3();
  
        if(this.JJ3value >= 6){
          this.JJ3value = 6;
        }
      }
  
      increaseJJ4(){
        this.JJ4value += 0.01;
        console.log(this.JJ4value);
        husky.setJointValue("j2n6s300_joint_4", this.JJ4value);
        var textEntity = document.getElementById('JJ4value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.JJ4value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JJ4value * (180/3.14)).toFixed(1));
        }
        
        this.future(5).increaseJJ4();
      }
      increaseJJ5(){
        this.JJ5value += 0.01;
        console.log(this.JJ5value);
        husky.setJointValue("j2n6s300_joint_5", this.JJ5value);
        var textEntity = document.getElementById('JJ5value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.JJ5value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JJ5value * (180/3.14)).toFixed(1));
        }
       
        this.future(5).increaseJJ5();
      }
  
      increaseJJ6(){
        this.JJ6value += 0.01;
        console.log(this.JJ6value);
        husky.setJointValue("j2n6s300_joint_6", this.JJ6value);
        var textEntity = document.getElementById('JJ6value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.JJ6value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JJ6value * (180/3.14)).toFixed(1));
        }
        
        this.future(5).increaseJJ6();
      }
  
      increaseJJF1(){
        this.JJF1value += 0.01;
        console.log(this.JJF1value);
        husky.setJointValue("j2n6s300_joint_finger_1", this.JJF1value);
        var textEntity = document.getElementById('JJF1value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.JJF1value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JJF1value*(180/3.14)).toFixed(1));
        }
        
        this.future(5).increaseJJF1();
  
        if(this.JJF1value >= 1.5){
          this.JJF1value = 1.5;
        }
      }
  
      increaseJJF2(){
        this.JJF2value += 0.01;
        console.log(this.JJF2value);
        husky.setJointValue("j2n6s300_joint_finger_2", this.JJF2value);
        var textEntity = document.getElementById('JJF2value');
        if(this.measurement === "raidans"){
          textEntity.setAttribute('text', 'value', this.JJF2value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JJF2value * (180/3.14)).toFixed(1));
        }
        
        this.future(5).increaseJJF2();
  
        if(this.JJF2value >= 1.5){
          this.JJF2value = 1.5;
        }
      }
  
      increaseJJF3(){
        this.JJF3value += 0.01;
        console.log(this.JJF3value);
        husky.setJointValue("j2n6s300_joint_finger_3", this.JJF3value);
        var textEntity = document.getElementById('JJF3value');
        if(this.measurement){
          textEntity.setAttribute('text', 'value', this.JJF3value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JJF3value * (180/3.14)).toFixed(1));
        }
       
        this.future(5).increaseJJF3();
  
        if(this.JJF3value >= 1.5){
          this.JJF3value = 1.5;
        }
      }
  
      increaseJJFT1(){
        this.JJFT1value += 0.01;
        console.log(this.JJFT1value);
        husky.setJointValue("j2n6s300_joint_finger_tip_1", this.JJFT1value);
        var textEntity = document.getElementById('JJFT1value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.JJFT1value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JJFT1value * (180/3.14)).toFixed(1));
        }
       
        this.future(5).increaseJJFT1();
  
        if(this.JJFT1value >= 2){
          this.JJFT1value = 2;
        }
      }
  
      increaseJJFT2(){
        this.JJFT2value += 0.01;
        console.log(this.JJFT2value);
        husky.setJointValue("j2n6s300_joint_finger_tip_2", this.JJFT2value);
        var textEntity = document.getElementById('JJFT2value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.JJFT2value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', this.JJFT2value * (180/3.14).toFixed(1));
        }
        
        this.future(5).increaseJJFT2();
  
        if(this.JJFT2value >= 2){
          this.JJFT2value = 2;
        }
      }
  
      increaseJJFT3(){
        this.JJFT3value += 0.01;
        console.log(this.JJFT3value);
        husky.setJointValue("j2n6s300_joint_finger_tip_3", this.JJFT3value);
        var textEntity = document.getElementById('JJFT3value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.JJFT3value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JJFT3value * (180/3.14)).toFixed(1));
        }
        this.future(5).increaseJJFT3();
  
        if(this.JJFT3value >= 2){
          this.JJFT3value = 2;
        }
      }
  
      increaseHH(){
        husky.position.y +=0.01;
        var textEntity = document.getElementById('HHvalue');
        textEntity.setAttribute('text', 'value', husky.position.y.toFixed(1));
        this.future(5).increaseHH();
      }
  
  
      decreaseFRW(){
        this.FRWvalue -= 0.01;
        console.log(this.FRWvalue);
        husky.setJointValue("front_right_wheel", this.FRWvalue);
        var textEntity = document.getElementById('FRWvalue');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.FRWvalue.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.FRWvalue * (180/3.14)).toFixed(1));
        }
        
        this.future(5).decreaseFRW();
      }
  
      decreaseFLW(){
        this.FLWvalue -= 0.01;
        console.log(this.FLWvalue);
        husky.setJointValue("front_left_wheel", this.FLWvalue);
        var textEntity = document.getElementById('FLWvalue');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.FLWvalue.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.FLWvalue * (180/3.14)).toFixed(1));
        }
        
        this.future(5).decreaseFLW();
      }
  
      decreaseBRW(){
        this.BRWvalue -= 0.01;
        console.log(this.BRWvalue);
        husky.setJointValue("rear_right_wheel", this.BRWvalue);
        var textEntity = document.getElementById('BRWvalue');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.BRWvalue.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.BRWvalue * (180/3.14)).toFixed(1));
        }
        
        this.future(5).decreaseBRW();
      }
  
      decreaseBLW(){
        this.BLWvalue -= 0.01;
        console.log(this.BLWvalue);
        husky.setJointValue("rear_left_wheel", this.BLWvalue);
        var textEntity = document.getElementById('BLWvalue')
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.BLWvalue.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.BLWvalue * (180/3.14)).toFixed(1));
        }
       
        this.future(5).decreaseBLW();
      }
  
      decreaseJJ1(){
        this.JJ1value -= 0.01;
        console.log(this.JJ1value);
        husky.setJointValue("j2n6s300_joint_1", this.JJ1value);
        var textEntity = document.getElementById('JJ1value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.JJ1value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JJ1value * (180/3.14)).toFixed(1));
        }
        
        this.future(5).decreaseJJ1();
      }
  
      decreaseJJ2(){
        this.JJ2value -= 0.01;
        console.log(this.JJ2value);
        husky.setJointValue("j2n6s300_joint_2", this.JJ2value);
        var textEntity = document.getElementById('JJ2value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.JJ2value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JJ2value * (180/3.14)).toFixed(1));
        }
        
        this.future(5).decreaseJJ2();
  
        if(this.JJ2value <= 0){
          this.JJ2value = 0;
        }
      }
  
      decreaseJJ3(){
        this.JJ3value -= 0.01;
        console.log(this.JJ3value);
        husky.setJointValue("j2n6s300_joint_3", this.JJ3value);
        var textEntity = document.getElementById('JJ3value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.JJ3value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JJ3value * (180/3.14)).toFixed(1));
        }
        
        this.future(5).decreaseJJ3();
  
        if(this.JJ3value <= 0){
          this.JJ3value = 0;
        }
      }
     decreaseJJ4(){
        this.JJ4value -= 0.01;
        console.log(this.JJ4value);
        husky.setJointValue("j2n6s300_joint_4", this.JJ4value);
        var textEntity = document.getElementById('JJ4value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.JJ4value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JJ4value * (180/3.14)).toFixed(1));
        }
        
        this.future(5).decreaseJJ4();
      }
      decreaseJJ5(){
        this.JJ5value -= 0.01;
        console.log(this.JJ5value);
        husky.setJointValue("j2n6s300_joint_5", this.JJ5value);
        var textEntity = document.getElementById('JJ5value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.JJ5value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JJ5value * (180/3.14)).toFixed(1));
        }
       
        this.future(5).decreaseJJ5();
      }
  
      decreaseJJ6(){
        this.JJ6value -= 0.01;
        console.log(this.JJ6value);
        husky.setJointValue("j2n6s300_joint_6", this.JJ6value);
        var textEntity = document.getElementById('JJ6value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.JJ6value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JJ6value * (180/3.14)).toFixed(1));
        }
       
        this.future(5).decreaseJJ6();
      }
  
      decreaseJJF1(){
        this.JJF1value -= 0.01;
        console.log(this.JJF1value);
        husky.setJointValue("j2n6s300_joint_finger_1", this.JJF1value);
        var textEntity = document.getElementById('JJF1value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.JJF1value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JJF1value * (180/3.14)).toFixed(1));
        }
       
        this.future(5).decreaseJJF1();
  
        if(this.JJF1value <= 0){
          this.JJF1value = 0;
        }
      }
  
      decreaseJJF2(){
        this.JJF2value -= 0.01;
        console.log(this.JJF2value);
        husky.setJointValue("j2n6s300_joint_finger_2", this.JJF2value);
        var textEntity = document.getElementById('JJF2value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.JJF2value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JJF2value * (180/3.14)).toFixed(1));
        }
        
        this.future(5).decreaseJJF2();
  
        if(this.JJF2value <= 0){
          this.JJF2value = 0;
        }
      }
  
      decreaseJJF3(){
        this.JJF3value -= 0.01;
        console.log(this.JJF3value);
        husky.setJointValue("j2n6s300_joint_finger_3", this.JJF3value);
        var textEntity = document.getElementById('JJF3value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.JJF3value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JJF3value * (180/3.14)).toFixed(1));
        }
        
        this.future(5).decreaseJJF3();
  
        if(this.JJF3value <= 0){
          this.JJF3value = 0;
        }
      }
  
      decreaseJJFT1(){
        this.JJFT1value -= 0.01;
        console.log(this.JJFT1value);
        husky.setJointValue("j2n6s300_joint_finger_tip_1", this.JJFT1value);
        var textEntity = document.getElementById('JJFT1value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.JJFT1value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JJFT1value * (180/3.14)).toFixed(1));
        }
        
        this.future(5).decreaseJJFT1();
  
        if(this.JJFT1value <= 0){
          this.JJFT1value = 0;
        }
      }
  
      decreaseJJFT2(){
        this.JJFT2value -= 0.01;
        console.log(this.JJFT2value);
        husky.setJointValue("j2n6s300_joint_finger_tip_2", this.JJFT2value);
        var textEntity = document.getElementById('JJFT2value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.JJFT2value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JJFT2value * (180/3.14)).toFixed(1));
        }
       
        this.future(5).decreaseJJFT2();
  
        if(this.JJFT2value <= 0){
          this.JJFT2value = 0;
        }
      }
  
      decreaseJJFT3(){
        this.JJFT3value -= 0.01;
        console.log(this.JJFT3value);
        husky.setJointValue("j2n6s300_joint_finger_tip_3", this.JJFT3value);
        var textEntity = document.getElementById('JJFT3value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.JJFT3value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JJFT3value * (180/3.14)).toFixed(1));
        }
        
        this.future(5).decreaseJJFT3();
  
        if(this.JJFT3value <= 0){
          this.JJFT3value = 0;
        }
      }
  
      decreaseHH(){
        husky.position.y -=0.01;
        var textEntity = document.getElementById('HHvalue');
        textEntity.setAttribute('text', 'value', husky.position.y.toFixed(1));
        this.future(5).decreaseHH();
      }
  
      gen3ButtonClick(){
        //robot visibilities
        gen3.visible = true;
        husky.visible = false;
  
        //husky button z positions
        document.getElementById("frontRightWheelJointPanel").object3D.position.z = 0;
        document.getElementById("frontLeftWheelJointPanel").object3D.position.z = 0;
        document.getElementById("backRightWheelJointPanel").object3D.position.z = 0;
        document.getElementById("backLeftWheelJointPanel").object3D.position.z = 0;
        document.getElementById("JJoint1Panel").object3D.position.z = 0;
        document.getElementById("JJoint2Panel").object3D.position.z = 0;
        document.getElementById("JJoint3Panel").object3D.position.z = 0;
        document.getElementById("JJoint4Panel").object3D.position.z = 0;
        document.getElementById("JJoint5Panel").object3D.position.z = 0;
        document.getElementById("JJoint6Panel").object3D.position.z = 0;
        document.getElementById("JJFJoint1Panel").object3D.position.z = 0;
        document.getElementById("JJFJoint2Panel").object3D.position.z = 0;
        document.getElementById("JJFJoint3Panel").object3D.position.z = 0;
        document.getElementById("JJFTJoint1Panel").object3D.position.z = 0;
        document.getElementById("JJFTJoint2Panel").object3D.position.z = 0;
        document.getElementById("JJFTJoint3Panel").object3D.position.z = 0;
        document.getElementById("HHPanel").object3D.position.z = 0;
  
        //husky button visibilities
        document.getElementById("frontRightWheelJointPanel").object3D.visible = false;
        document.getElementById("frontLeftWheelJointPanel").object3D.visible = false;
        document.getElementById("backRightWheelJointPanel").object3D.visible = false;
        document.getElementById("backLeftWheelJointPanel").object3D.visible = false;
        document.getElementById("JJoint1Panel").object3D.visible = false;
        document.getElementById("JJoint2Panel").object3D.visible = false;
        document.getElementById("JJoint3Panel").object3D.visible = false;
        document.getElementById("JJoint4Panel").object3D.visible = false;
        document.getElementById("JJoint5Panel").object3D.visible = false;
        document.getElementById("JJoint6Panel").object3D.visible = false;
        document.getElementById("JJFJoint1Panel").object3D.visible = false
        document.getElementById("JJFJoint2Panel").object3D.visible = false;
        document.getElementById("JJFJoint3Panel").object3D.visible = false;
        document.getElementById("JJFTJoint1Panel").object3D.visible = false;
        document.getElementById("JJFTJoint2Panel").object3D.visible = false;
        document.getElementById("JJFTJoint3Panel").object3D.visible = false;
        document.getElementById("HHPanel").object3D.visible = false;
  
        //gen3 button positioning
        document.getElementById("Joint1Panel").object3D.position.z = 0.11;
        document.getElementById("Joint2Panel").object3D.position.z = 0.11;
        document.getElementById("Joint3Panel").object3D.position.z = 0.11;
        document.getElementById("Joint4Panel").object3D.position.z = 0.11;
        document.getElementById("Joint5Panel").object3D.position.z = 0.11;
        document.getElementById("Joint6Panel").object3D.position.z = 0.11;
        document.getElementById("JointFPanel").object3D.position.z = 0.11;
        document.getElementById("JointLIKPanel").object3D.position.z = 0.11;
        document.getElementById("JointLIFPanel").object3D.position.z = 0.11;
        document.getElementById("JointRIKPanel").object3D.position.z = 0.11;
        document.getElementById("JointRIFPanel").object3D.position.z = 0.11;
        document.getElementById("G3HPanel").object3D.position.z = 0.11;
  
        //gen3 button visibility
        document.getElementById("Joint1Panel").object3D.visible = true;
        document.getElementById("Joint2Panel").object3D.visible = true;
        document.getElementById("Joint3Panel").object3D.visible = true;
        document.getElementById("Joint4Panel").object3D.visible = true;
        document.getElementById("Joint5Panel").object3D.visible = true;
        document.getElementById("Joint6Panel").object3D.visible = true;
        document.getElementById("JointFPanel").object3D.visible = true;
        document.getElementById("JointLIKPanel").object3D.visible = true;
        document.getElementById("JointLIFPanel").object3D.visible = true;
        document.getElementById("JointRIKPanel").object3D.visible = true;
        document.getElementById("JointRIFPanel").object3D.visible = true;
        document.getElementById("G3HPanel").object3D.visible = true;
      }
  
      huskyButtonClick(){
        //robot switching
        husky.visible = true;
        gen3.visible = false;
  
        //husky buttons z position
        document.getElementById("frontRightWheelJointPanel").object3D.position.z = 0.11;
        document.getElementById("frontLeftWheelJointPanel").object3D.position.z = 0.11;
        document.getElementById("backRightWheelJointPanel").object3D.position.z = 0.11;
        document.getElementById("backLeftWheelJointPanel").object3D.position.z = 0.11;
        document.getElementById("JJoint1Panel").object3D.position.z = 0.11;
        document.getElementById("JJoint2Panel").object3D.position.z = 0.11;
        document.getElementById("JJoint3Panel").object3D.position.z = 0.11;
        document.getElementById("JJoint4Panel").object3D.position.z = 0.11;
        document.getElementById("JJoint5Panel").object3D.position.z = 0.11;
        document.getElementById("JJoint6Panel").object3D.position.z = 0.11;
        document.getElementById("JJFJoint1Panel").object3D.position.z = 0.11;
        document.getElementById("JJFJoint2Panel").object3D.position.z = 0.11;
        document.getElementById("JJFJoint3Panel").object3D.position.z = 0.11;
        document.getElementById("JJFTJoint1Panel").object3D.position.z = 0.11;
        document.getElementById("JJFTJoint2Panel").object3D.position.z = 0.11;
        document.getElementById("JJFTJoint3Panel").object3D.position.z = 0.11;
        document.getElementById("HHPanel").object3D.position.z = 0.11;
  
        //husky buttons visibility
        document.getElementById("frontRightWheelJointPanel").object3D.visible = true;
        document.getElementById("frontLeftWheelJointPanel").object3D.visible = true;
        document.getElementById("backRightWheelJointPanel").object3D.visible = true;
        document.getElementById("backLeftWheelJointPanel").object3D.visible = true;
        document.getElementById("JJoint1Panel").object3D.visible = true;
        document.getElementById("JJoint2Panel").object3D.visible = true;
        document.getElementById("JJoint3Panel").object3D.visible = true;
        document.getElementById("JJoint4Panel").object3D.visible = true;
        document.getElementById("JJoint5Panel").object3D.visible = true;
        document.getElementById("JJoint6Panel").object3D.visible = true;
        document.getElementById("JJFJoint1Panel").object3D.visible = true;
        document.getElementById("JJFJoint2Panel").object3D.visible = true;
        document.getElementById("JJFJoint3Panel").object3D.visible = true;
        document.getElementById("JJFTJoint1Panel").object3D.visible = true;
        document.getElementById("JJFTJoint2Panel").object3D.visible = true;
        document.getElementById("JJFTJoint3Panel").object3D.visible = true;
        document.getElementById("HHPanel").object3D.visible = true;
  
        //gen3 buttons z position
        document.getElementById("Joint1Panel").object3D.position.z = 0;
        document.getElementById("Joint2Panel").object3D.position.z = 0;
        document.getElementById("Joint3Panel").object3D.position.z = 0;
        document.getElementById("Joint4Panel").object3D.position.z = 0;
        document.getElementById("Joint5Panel").object3D.position.z = 0;
        document.getElementById("Joint6Panel").object3D.position.z = 0;
        document.getElementById("JointFPanel").object3D.position.z = 0;
        document.getElementById("JointLIKPanel").object3D.position.z = 0;
        document.getElementById("JointLIFPanel").object3D.position.z = 0;
        document.getElementById("JointRIKPanel").object3D.position.z = 0;
        document.getElementById("JointRIFPanel").object3D.position.z = 0;
        document.getElementById("G3HPanel").object3D.position.z = 0;
  
        //gen3 buttons visibility
        document.getElementById("Joint1Panel").object3D.visible = false;
        document.getElementById("Joint2Panel").object3D.visible = false;
        document.getElementById("Joint3Panel").object3D.visible = false;
        document.getElementById("Joint4Panel").object3D.visible = false;
        document.getElementById("Joint5Panel").object3D.visible = false;
        document.getElementById("Joint6Panel").object3D.visible = false;
        document.getElementById("JointFPanel").object3D.visible = false;
        document.getElementById("JointLIKPanel").object3D.visible = false;
        document.getElementById("JointLIFPanel").object3D.visible = false;
        document.getElementById("JointRIKPanel").object3D.visible = false;
        document.getElementById("JointRIFPanel").object3D.visible = false;
        document.getElementById("G3HPanel").object3D.visible = false;
      }
  
      increaseJ1(){
        this.J1value += 0.01;
        console.log(this.J1value);
        gen3.setJointValue("joint_1", this.J1value);
        var textEntity = document.getElementById('J1value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.J1value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.J1value * (180/3.14)).toFixed(1));
        }
        
        this.future(5).increaseJ1();
      }
  
      increaseJ2(){
        this.J2value += 0.01;
        console.log(this.J2value);
        gen3.setJointValue("joint_2", this.J2value);
        var textEntity = document.getElementById('J2value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.J2value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.J2value * (180/3.14)).toFixed(1));
        }
        
        this.future(5).increaseJ2();
  
        if(this.J2value >= 2.5){
          this.J2value = 2.5;
        }
      }
  
      increaseJ3(){
        this.J3value += 0.01;
        console.log(this.J3value);
        gen3.setJointValue("joint_3", this.J3value);
        var textEntity = document.getElementById('J3value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.J3value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.J3value * (180/3.14)).toFixed(1));
        }
        
        this.future(5).increaseJ3();
  
        if(this.J3value >= 2.7){
          this.J3value = 2.7;
        }
      }
  
      increaseJ4(){
        this.J4value += 0.01;
        console.log(this.J4value);
        gen3.setJointValue("joint_4", this.J4value);
        var textEntity = document.getElementById('J4value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.J4value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.J4value * (180/3.14)).toFixed(1));
        }
       
        this.future(5).increaseJ4();
      }
  
      increaseJ5(){
        this.J5value += 0.01;
        console.log(this.J5value);
        gen3.setJointValue("joint_5", this.J5value);
        var textEntity = document.getElementById('J5value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.J5value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.J5value * (180/3.14)).toFixed(1));
        }
        
        this.future(5).increaseJ5();
  
        if(this.J5value >= 2.3){
          this.J5value = 2.3;
        }
      }
  
      increaseJ6(){
        this.J6value += 0.01;
        console.log(this.J6value);
        gen3.setJointValue("joint_6", this.J6value);
        var textEntity = document.getElementById('J6value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.J6value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.J6value * (180/3.14)).toFixed(1));
        }
        
        this.future(5).increaseJ6();
      }
  
      increaseJF(){
        this.JFvalue += 0.01;
        console.log(this.JFvalue);
        gen3.setJointValue("finger_joint", this.JFvalue);
        var textEntity = document.getElementById('JFvalue');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.JFvalue.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JFvalue * (180/3.14)).toFixed(1));
        }
        this.future(5).increaseJF();
  
        if(this.JFvalue >= 1){
          this.JFvalue = 1;
        }
      }
  
      increaseJLIK(){
        this.JLIKvalue += 0.01;
        console.log(this.JLIKvalue);
        gen3.setJointValue("left_inner_knuckle_joint", this.JLIKvalue);
        var textEntity = document.getElementById('JLIKvalue');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.JLIKvalue.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JLIKvalue * (180/3.14)).toFixed(1));
        }
        
        this.future(5).increaseJLIK();
  
        if(this.JLIKvalue >= 1){
          this.JLIKvalue = 1;
        }
      }
      increaseJLIF(){
        this.JLIFvalue += 0.01;
        console.log(this.JLIFvalue);
        gen3.setJointValue("left_inner_finger_joint", this.JLIFvalue);
        var textEntity = document.getElementById('JLIFvalue');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.JLIFvalue.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JLIFvalue * (180/3.14)).toFixed(1));
        }
        
        this.future(5).increaseJLIF();
  
        if(this.JLIFvalue >= 1){
          this.JLIFvalue = 1;
        }
      }
      increaseJRIK(){
        this.JRIKvalue += 0.01;
        console.log(this.JRIKvalue);
        gen3.setJointValue("right_inner_knuckle_joint", this.JRIKvalue);
        var textEntity = document.getElementById('JRIKvalue');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.JRIKvalue.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JRIKvalue * (180/3.14)).toFixed(1));
        }
       
        this.future(5).increaseJRIK();
  
        if(this.JRIKvalue >= 1){
          this.JRIKvalue = 1;
        }
      }
  
      increaseJRIF(){
        this.JRIFvalue += 0.01;
        console.log(this.JRIFvalue);
        gen3.setJointValue("right_inner_finger_joint", this.JRIFvalue);
        var textEntity = document.getElementById('JRIFvalue');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.JRIFvalue.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JRIFvalue * (180/3.14)).toFixed(1));
        }
       
        this.future(5).increaseJRIF();
  
        if(this.JRIFvalue >= 1){
          this.JRIFvalue = 1;
        }
      }
  
      decreaseJ1(){
        this.J1value -= 0.01;
        console.log(this.J1value);
        gen3.setJointValue("joint_1", this.J1value);
        var textEntity = document.getElementById('J1value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.J1value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', this.J1value * (180/3.14).toFixed(1));
        }
        
        this.future(5).decreaseJ1();
      }
  
      decreaseJ2(){
        this.J2value -= 0.01;
        console.log(this.J2value);
        gen3.setJointValue("joint_2", this.J2value);
        var textEntity = document.getElementById('J2value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.J2value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.J2value * (180/3.14)).toFixed(1));
        }
        
        this.future(5).decreaseJ2();
  
        if(this.J2value <= -2.5){
          this.J2value = -2.5;
        }
      }
  
      decreaseJ3(){
        this.J3value -= 0.01;
        console.log(this.J3value);
        gen3.setJointValue("joint_3", this.J3value);
        var textEntity = document.getElementById('J3value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.J3value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.J3value * (180/3.14)).toFixed(1));
        }
       
        this.future(5).decreaseJ3();
  
        if(this.J3value <= -2.7){
          this.J3value = -2.7;
        }
      }
  
      decreaseJ4(){
        this.J4value -= 0.01;
        console.log(this.J4value);
        gen3.setJointValue("joint_4", this.J4value);
        var textEntity = document.getElementById('J4value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.J4value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.J4value * (180/3.14)).toFixed(1));
        }
        
        this.future(5).decreaseJ4();
      }
  
      decreaseJ5(){
        this.J5value -= 0.01;
        console.log(this.J5value);
        gen3.setJointValue("joint_5", this.J5value);
        var textEntity = document.getElementById('J5value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.J5value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.J5value * (180/3.14)).toFixed(1));
        }
       
        this.future(5).decreaseJ5();
  
        if(this.J5value <= -2.3){
          this.J5value = -2.3;
        }
      }
  
      decreaseJ6(){
        this.J6value -= 0.01;
        console.log(this.J6value);
        gen3.setJointValue("joint_6", this.J6value);
        var textEntity = document.getElementById('J6value');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.J6value.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.J6value * (180/3.14)).toFixed(1));
        }
        
        this.future(5).decreaseJ6();
      }
  
      decreaseJF(){
        this.JFvalue -= 0.01;
        console.log(this.JFvalue);
        gen3.setJointValue("finger_joint", this.JFvalue);
        var textEntity = document.getElementById('JFvalue');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.JFvalue.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JFvalue * (180/3.14)).toFixed(1));
        }
        
        this.future(5).decreaseJF();
  
        if(this.JFvalue <= -1){
          this.JFvalue = -1;
        }
      }
  
      decreaseJLIK(){
        this.JLIKvalue -= 0.01;
        console.log(this.JLIKvalue);
        gen3.setJointValue("left_inner_knuckle_joint", this.JLIKvalue);
        var textEntity = document.getElementById('JLIKvalue');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.JLIKvalue.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JLIKvalue * (180/3.14)).toFixed(1));
        }
        
        this.future(5).decreaseJLIK();
  
        if(this.JLIKvalue <= 0){
          this.JLIKvalue = 0;
        }
      }
  
      decreaseJLIF(){
        this.JLIFvalue -= 0.01;
        console.log(this.JLIFvalue);
        gen3.setJointValue("left_inner_finger_joint", this.JLIFvalue);
        var textEntity = document.getElementById('JLIFvalue');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.JLIFvalue.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JLIFvalue * (180/3.14)).toFixed(1));
        }
        
        this.future(5).decreaseJLIF();
  
        if(this.JLIFvalue <= -1){
          this.JLIFvalue = -1;
        }
      }
  
      decreaseJRIK(){
        this.JRIKvalue -= 0.01;
        console.log(this.JRIKvalue);
        gen3.setJointValue("right_inner_knuckle_joint", this.JRIKvalue);
        var textEntity = document.getElementById('JRIKvalue');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.JRIKvalue.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JRIKvalue * (180/3.14)).toFixed(1));
        }
        
        this.future(5).decreaseJRIK();
  
        if(this.JRIKvalue <= 0){
          this.JRIKvalue = 0;
        }
      }
  
      decreaseJRIF(){
        this.JRIFvalue -= 0.01;
        console.log(this.JRIFvalue);
        gen3.setJointValue("right_inner_finger_joint", this.JRIFvalue);
        var textEntity = document.getElementById('JRIFvalue');
        if(this.measurement === "radians"){
          textEntity.setAttribute('text', 'value', this.JRIFvalue.toFixed(1));
        }else{
          textEntity.setAttribute('text', 'value', (this.JRIFvalue * (180/3.14)).toFixed(1));
        }
        
        this.future(5).decreaseJRIF();
  
        if(this.JRIFvalue <= -1){
          this.JRIFvalue = -1;
        }
      }
      decreaseG3H(){
        gen3.position.y -=0.01;
        var textEntity = document.getElementById('G3Hvalue');
        textEntity.setAttribute('text', 'value', gen3.position.y.toFixed(1));
        this.future(5).decreaseG3H();
      }
  
      increaseG3H(){
        gen3.position.y +=0.01;
        var textEntity = document.getElementById('G3Hvalue'); 
        textEntity.setAttribute('text', 'value', gen3.position.y.toFixed(1));
        this.future(5).increaseG3H();
      }
  
      resetValues(){
       //reset values
      this.FRWvalue = 0;
      this.FLWvalue = 0;
      this.BRWvalue = 0;
      this.BLWvalue = 0;
      this.JJ1value = 0;
      this.JJ2value = 0;
      this.JJ3value = 0;
      this.JJ4value = 0;
      this.JJ5value = 0;
      this.JJ6value = 0;
      this.JJF1value = 0;
      this.JJF2value = 0;
      this.JJF3value = 0;
      this.JJFT1value = 0;
      this.JJFT2value = 0;
      this.JJFT3value = 0;
  
      //gen3 values
      this.J1value = 0;
      this.J2value = 0;
      this.J3value = 0;
      this.J4value = 0;
      this.J5value = 0;
      this.J6value = 0;
      this.JFvalue = 0;
      this.JLIKvalue = 0;
      this.JLIFvalue = 0;
      this.JRIKvalue = 0;
      this.JRIFvalue = 0;
  
      
  
      //set text values
      document.getElementById('FRWvalue').setAttribute('text', 'value', this.FRWvalue.toFixed(1));
      document.getElementById('FLWvalue').setAttribute('text', 'value', this.FLWvalue.toFixed(1));
      document.getElementById('BRWvalue').setAttribute('text', 'value', this.BRWvalue.toFixed(1));
      document.getElementById('BLWvalue').setAttribute('text', 'value', this.BLWvalue.toFixed(1));
      document.getElementById('JJ1value').setAttribute('text', 'value', this.JJ1value.toFixed(1));
      document.getElementById('JJ2value').setAttribute('text', 'value', this.JJ2value.toFixed(1));
      document.getElementById('JJ3value').setAttribute('text', 'value', this.JJ3value.toFixed(1));
      document.getElementById('JJ4value').setAttribute('text', 'value', this.JJ4value.toFixed(1));
      document.getElementById('JJ5value').setAttribute('text', 'value', this.JJ5value.toFixed(1));
      document.getElementById('JJ6value').setAttribute('text', 'value', this.JJ6value.toFixed(1));
      document.getElementById('JJF1value').setAttribute('text', 'value', this.JJF1value.toFixed(1));
      document.getElementById('JJF2value').setAttribute('text', 'value', this.JJF2value.toFixed(1));
      document.getElementById('JJF3value').setAttribute('text', 'value', this.JJF3value.toFixed(1));
      document.getElementById('JJFT1value').setAttribute('text', 'value', this.JJFT1value.toFixed(1));
      document.getElementById('JJFT2value').setAttribute('text', 'value', this.JJFT2value.toFixed(1));
      document.getElementById('JJFT3value').setAttribute('text', 'value', this.JJFT3value.toFixed(1));
      document.getElementById('J1value').setAttribute('text', 'value', this.J1value.toFixed(1));
      document.getElementById('J2value').setAttribute('text', 'value', this.J2value.toFixed(1));
      document.getElementById('J3value').setAttribute('text', 'value', this.J3value.toFixed(1));
      document.getElementById('J4value').setAttribute('text', 'value', this.J4value.toFixed(1));
      document.getElementById('J5value').setAttribute('text', 'value', this.J5value.toFixed(1));
      document.getElementById('J6value').setAttribute('text', 'value', this.J6value.toFixed(1));
      document.getElementById('JLIKvalue').setAttribute('text', 'value', this.JLIKvalue.toFixed(1));
      document.getElementById('JLIFvalue').setAttribute('text', 'value', this.JLIFvalue.toFixed(1));
      document.getElementById('JRIKvalue').setAttribute('text', 'value', this.JRIKvalue.toFixed(1));
      document.getElementById('JRIFvalue').setAttribute('text', 'value', this.JRIFvalue.toFixed(1));
  
      //set joints
      husky.setJointValue("front_right_wheel", this.FRWvalue);
      husky.setJointValue("front_left_wheel", this.FLWvalue);
      husky.setJointValue("rear_right_wheel", this.BRWvalue);
      husky.setJointValue("rear_left_wheel", this.BLWvalue);
      husky.setJointValue("j2n6s300_joint_1", this.JJ1value);
      husky.setJointValue("j2n6s300_joint_2", this.JJ2value);
      husky.setJointValue("j2n6s300_joint_3", this.JJ3value);
      husky.setJointValue("j2n6s300_joint_4", this.JJ4value);
      husky.setJointValue("j2n6s300_joint_5", this.JJ5value);
      husky.setJointValue("j2n6s300_joint_6", this.JJ6value);
      husky.setJointValue("j2n6s300_joint_finger_1", this.JJF1value);
      husky.setJointValue("j2n6s300_joint_finger_2", this.JJF2value);
      husky.setJointValue("j2n6s300_joint_finger_3", this.JJF3value);
      husky.setJointValue("j2n6s300_joint_finger_tip_1", this.JJFT1value);
      husky.setJointValue("j2n6s300_joint_finger_tip_2", this.JJFT2value);
      husky.setJointValue("j2n6s300_joint_finger_tip_3", this.JJFT3value);
      gen3.setJointValue("joint_1", this.J1value);
      gen3.setJointValue("joint_2", this.J2value);
      gen3.setJointValue("joint_3", this.J3value);
      gen3.setJointValue("joint_4", this.J4value);
      gen3.setJointValue("joint_5", this.J5value);
      gen3.setJointValue("joint_6", this.J6value);
      gen3.setJointValue("finger_joint", this.JFvalue);
      gen3.setJointValue("left_inner_knuckle_joint", this.JLIKvalue);
      gen3.setJointValue("left_inner_finger_joint", this.JLIFvalue);
      gen3.setJointValue("right_inner_knuckle_joint", this.JRIKvalue);
      gen3.setJointValue("right_inner_finger_joint", this.JRIFvalue);
      }
  
      userToggle(){
        this.count++;
        console.log(this.count);
        if(this.count % 2 == 1){
          console.log("odd"); // single player
          document.getElementById('userToggleText').setAttribute('text', 'value', "Single User");
          this.unsubscribe("FRWIncrease", "mousedown", this.increaseFRW);
      this.unsubscribe("FRWIncrease", "mouseup", this.mouseUp);
      this.unsubscribe("FRWDecrease", "mousedown", this.decreaseFRW);
      this.unsubscribe("FRWDecrease", "mouseup", this.mouseUp);
      this.unsubscribe("FLWIncrease", "mousedown", this.increaseFLW);
      this.unsubscribe("FLWIncrease", "mouseup", this.mouseUp);
      this.unsubscribe("FLWDecrease", "mousedown", this.decreaseFLW);
      this.unsubscribe("FLWDecrease", "mouseup", this.mouseUp);
      this.unsubscribe("BRWIncrease", "mousedown", this.increaseBRW);
      this.unsubscribe("BRWIncrease", "mouseup", this.mouseUp);
      this.unsubscribe("BRWDecrease", "mousedown", this.decreaseBRW);
      this.unsubscribe("BRWDecrease", "mouseup", this.mouseUp);
      this.unsubscribe("BLWIncrease", "mousedown", this.increaseBLW);
      this.unsubscribe("BLWIncrease", "mouseup", this.mouseUp);
      this.unsubscribe("BLWDecrease", "mousedown", this.decreaseBLW);
      this.unsubscribe("BLWDecrease", "mouseup", this.mouseUp);
      this.unsubscribe("JJ1Increase", "mousedown", this.increaseJJ1);
      this.unsubscribe("JJ1Increase", "mouseup", this.mouseUp);
      this.unsubscribe("JJ1Decrease", "mousedown", this.decreaseJJ1);
      this.unsubscribe("JJ1Decrease", "mouseup", this.mouseUp);
      this.unsubscribe("JJ2Increase", "mousedown", this.increaseJJ2);
      this.unsubscribe("JJ2Increase", "mouseup", this.mouseUp);
      this.unsubscribe("JJ2Decrease", "mousedown", this.decreaseJJ2);
      this.unsubscribe("JJ2Decrease", "mouseup", this.mouseUp);
      this.unsubscribe("JJ3Increase", "mousedown", this.increaseJJ3);
      this.unsubscribe("JJ3Increase", "mouseup", this.mouseUp);
      this.unsubscribe("JJ3Decrease", "mousedown", this.decreaseJJ3);
      this.unsubscribe("JJ3Decrease", "mouseup", this.mouseUp);
      this.unsubscribe("JJ4Increase", "mousedown", this.increaseJJ4);
      this.unsubscribe("JJ4Increase", "mouseup", this.mouseUp);
      this.unsubscribe("JJ4Decrease", "mousedown", this.decreaseJJ4);
      this.unsubscribe("JJ4Decrease", "mouseup", this.mouseUp);
      this.unsubscribe("JJ5Increase", "mousedown", this.increaseJJ5);
      this.unsubscribe("JJ5Increase", "mouseup", this.mouseUp);
      this.unsubscribe("JJ5Decrease", "mousedown", this.decreaseJJ5);
      this.unsubscribe("JJ5Decrease", "mouseup", this.mouseUp);
      this.unsubscribe("JJ6Increase", "mousedown", this.increaseJJ6);
      this.unsubscribe("JJ6Increase", "mouseup", this.mouseUp);
      this.unsubscribe("JJ6Decrease", "mousedown", this.decreaseJJ6);
      this.unsubscribe("JJ6Decrease", "mouseup", this.mouseUp);
      this.unsubscribe("JJF1Increase", "mousedown", this.increaseJJF1);
      this.unsubscribe("JJF1Increase", "mouseup", this.mouseUp);
      this.unsubscribe("JJF1Decrease", "mousedown", this.decreaseJJF1);
      this.unsubscribe("JJF1Decrease", "mouseup", this.mouseUp);
      this.unsubscribe("JJF2Increase", "mousedown", this.increaseJJF2);
      this.unsubscribe("JJF2Increase", "mouseup", this.mouseUp);
      this.unsubscribe("JJF2Decrease", "mousedown", this.decreaseJJF2);
      this.unsubscribe("JJF2Decrease", "mouseup", this.mouseUp);
      this.unsubscribe("JJF3Increase", "mousedown", this.increaseJJF3);
      this.unsubscribe("JJF3Increase", "mouseup", this.mouseUp);
      this.unsubscribe("JJF3Decrease", "mousedown", this.decreaseJJF3);
      this.unsubscribe("JJF3Decrease", "mouseup", this.mouseUp);
      this.unsubscribe("JJFT1Increase", "mousedown", this.increaseJJFT1);
      this.unsubscribe("JJFT1Increase", "mouseup", this.mouseUp);
      this.unsubscribe("JJFT1Decrease", "mousedown", this.decreaseJJFT1);
      this.unsubscribe("JJFT1Decrease", "mouseup", this.mouseUp);
      this.unsubscribe("JJFT2Increase", "mousedown", this.increaseJJFT2);
      this.unsubscribe("JJFT2Increase", "mouseup", this.mouseUp);
      this.unsubscribe("JJFT2Decrease", "mousedown", this.decreaseJJFT2);
      this.unsubscribe("JJFT2Decrease", "mouseup", this.mouseUp);
      this.unsubscribe("JJFT3Increase", "mousedown", this.increaseJJFT3);
      this.unsubscribe("JJFT3Increase", "mouseup", this.mouseUp);
      this.unsubscribe("JJFT3Decrease", "mousedown", this.decreaseJJFT3);
      this.unsubscribe("JJFT3Decrease", "mouseup", this.mouseUp);
      this.unsubscribe("HHIncrease", "mousedown", this.increaseHH);
      this.unsubscribe("HHIncrease", "mouseup", this.mouseUp);
      this.unsubscribe("HHDecrease", "mousedown", this.decreaseHH);
      this.unsubscribe("HHDecrease", "mouseup", this.mouseUp);
  
      //robot switching subscribes
      this.unsubscribe("gen3Button", "click", this.gen3ButtonClick);
      this.unsubscribe("huskyButton", "click", this.huskyButtonClick);
  
      //gen3 subscribes
      this.unsubscribe("J1Increase", "mousedown", this.increaseJ1);
      this.unsubscribe("J1Increase", "mouseup", this.mouseUp);
      this.unsubscribe("J1Decrease", "mousedown", this.decreaseJ1);
      this.unsubscribe("J1Decrease", "mouseup", this.mouseUp);
      this.unsubscribe("J2Increase", "mousedown", this.increaseJ2);
      this.unsubscribe("J2Increase", "mouseup", this.mouseUp);
      this.unsubscribe("J2Decrease", "mousedown", this.decreaseJ2);
      this.unsubscribe("J2Decrease", "mouseup", this.mouseUp);
      this.unsubscribe("J3Increase", "mousedown", this.increaseJ3);
      this.unsubscribe("J3Increase", "mouseup", this.mouseUp);
      this.unsubscribe("J3Decrease", "mousedown", this.decreaseJ3);
      this.unsubscribe("J3Decrease", "mouseup", this.mouseUp);
      this.unsubscribe("J4Increase", "mousedown", this.increaseJ4);
      this.unsubscribe("J4Increase", "mouseup", this.mouseUp);
      this.unsubscribe("J4Decrease", "mousedown", this.decreaseJ4);
      this.unsubscribe("J4Decrease", "mouseup", this.mouseUp);
      this.unsubscribe("J5Increase", "mousedown", this.increaseJ5);
      this.unsubscribe("J5Increase", "mouseup", this.mouseUp);
      this.unsubscribe("J5Decrease", "mousedown", this.decreaseJ5);
      this.unsubscribe("J5Decrease", "mouseup", this.mouseUp);
      this.unsubscribe("J6Increase", "mousedown", this.increaseJ6);
      this.unsubscribe("J6Increase", "mouseup", this.mouseUp);
      this.unsubscribe("J6Decrease", "mousedown", this.decreaseJ6);
      this.unsubscribe("J6Decrease", "mouseup", this.mouseUp);
      this.unsubscribe("JFIncrease", "mousedown", this.increaseJF);
      this.unsubscribe("JFIncrease", "mouseup", this.mouseUp);
      this.unsubscribe("JFDecrease", "mousedown", this.decreaseJF);
      this.unsubscribe("JFDecrease", "mouseup", this.mouseUp);
      this.unsubscribe("JLIKIncrease", "mousedown", this.increaseJLIK);
      this.unsubscribe("JLIKIncrease", "mouseup", this.mouseUp);
      this.unsubscribe("JLIKDecrease", "mousedown", this.decreaseJLIK);
      this.unsubscribe("JLIKDecrease", "mouseup", this.mouseUp);
      this.unsubscribe("JLIFIncrease", "mousedown", this.increaseJLIF);
      this.unsubscribe("JLIFIncrease", "mouseup", this.mouseUp);
      this.unsubscribe("JLIFDecrease", "mousedown", this.decreaseJLIF);
      this.unsubscribe("JLIFDecrease", "mouseup", this.mouseUp);
      this.unsubscribe("JRIKIncrease", "mousedown", this.increaseJRIK);
      this.unsubscribe("JRIKIncrease", "mouseup", this.mouseUp);
      this.unsubscribe("JRIKDecrease", "mousedown", this.decreaseJRIK);
      this.unsubscribe("JRIKDecrease", "mouseup", this.mouseUp);
      this.unsubscribe("JRIFIncrease", "mousedown", this.increaseJRIF);
      this.unsubscribe("JRIFIncrease", "mouseup", this.mouseUp);
      this.unsubscribe("JRIFDecrease", "mousedown", this.decreaseJRIF);
      this.unsubscribe("JRIFDecrease", "mouseup", this.mouseUp);
      this.unsubscribe("G3HIncrease", "mousedown", this.increaseG3H);
      this.unsubscribe("G3HIncrease", "mouseup", this.mouseUp);
      this.unsubscribe("G3HDecrease", "mousedown", this.decreaseG3H);
      this.unsubscribe("G3HDecrease", "mouseup", this.mouseUp);
  
      
      document.getElementById("huskyButton").setAttribute('husky-click', '');
      document.getElementById("gen3Button").setAttribute('gen3-click', '');
      document.getElementById("FRWincreaseButton").setAttribute('increase-click', '');
      document.getElementById("FLWincreaseButton").setAttribute('increase-click', '');
      document.getElementById("BRWincreaseButton").setAttribute('increase-click', '');
      document.getElementById("BLWincreaseButton").setAttribute('increase-click', '');
      document.getElementById("JJ1increaseButton").setAttribute('increase-click', '');
      document.getElementById("JJ2increaseButton").setAttribute('increase-click', '');
      document.getElementById("JJ3increaseButton").setAttribute('increase-click', '');
      document.getElementById("JJ4increaseButton").setAttribute('increase-click', '');
      document.getElementById("JJ5increaseButton").setAttribute('increase-click', '');
      document.getElementById("JJ6increaseButton").setAttribute('increase-click', '');
      document.getElementById("JJF1increaseButton").setAttribute('increase-click', '');
      document.getElementById("JJF2increaseButton").setAttribute('increase-click', '');
      document.getElementById("JJF3increaseButton").setAttribute('increase-click', '');
      document.getElementById("JJFT1increaseButton").setAttribute('increase-click', '');
      document.getElementById("JJFT2increaseButton").setAttribute('increase-click', '');
      document.getElementById("JJFT3increaseButton").setAttribute('increase-click', '');
      document.getElementById("HHincreaseButton").setAttribute('increase-click', '');
  
      document.getElementById("J1increaseButton").setAttribute('increase-click', '');
      document.getElementById("J2increaseButton").setAttribute('increase-click', '');
      document.getElementById("J3increaseButton").setAttribute('increase-click', '');
      document.getElementById("J4increaseButton").setAttribute('increase-click', '');
      document.getElementById("J5increaseButton").setAttribute('increase-click', '');
      document.getElementById("J6increaseButton").setAttribute('increase-click', '');
      document.getElementById("JFincreaseButton").setAttribute('increase-click', '');
      document.getElementById("JLIKincreaseButton").setAttribute('increase-click', '');
      document.getElementById("JLIFincreaseButton").setAttribute('increase-click', '');
      document.getElementById("JRIKincreaseButton").setAttribute('increase-click', '');
      document.getElementById("JRIFincreaseButton").setAttribute('increase-click', '');
      document.getElementById("JLIKincreaseButton").setAttribute('increase-click', '');
      document.getElementById("G3HincreaseButton").setAttribute('increase-click', '');
      
  
      document.getElementById("FRWdecreaseButton").setAttribute('decrease-click', '');
      document.getElementById("FLWdecreaseButton").setAttribute('decrease-click', '');
      document.getElementById("BRWdecreaseButton").setAttribute('decrease-click', '');
      document.getElementById("BLWdecreaseButton").setAttribute('decrease-click', '');
      document.getElementById("JJ1decreaseButton").setAttribute('decrease-click', '');
      document.getElementById("JJ2decreaseButton").setAttribute('decrease-click', '');
      document.getElementById("JJ3decreaseButton").setAttribute('decrease-click', '');
      document.getElementById("JJ4decreaseButton").setAttribute('decrease-click', '');
      document.getElementById("JJ5decreaseButton").setAttribute('decrease-click', '');
      document.getElementById("JJ6decreaseButton").setAttribute('decrease-click', '');
      document.getElementById("JJF1decreaseButton").setAttribute('decrease-click', '');
      document.getElementById("JJF2decreaseButton").setAttribute('decrease-click', '');
      document.getElementById("JJF3decreaseButton").setAttribute('decrease-click', '');
      document.getElementById("JJFT1decreaseButton").setAttribute('decrease-click', '');
      document.getElementById("JJFT2decreaseButton").setAttribute('decrease-click', '');
      document.getElementById("JJFT3decreaseButton").setAttribute('decrease-click', '');
      document.getElementById("HHdecreaseButton").setAttribute('decrease-click', '');
      
  
      document.getElementById("J1decreaseButton").setAttribute('decrease-click', '');
      document.getElementById("J2decreaseButton").setAttribute('decrease-click', '');
      document.getElementById("J3decreaseButton").setAttribute('decrease-click', '');
      document.getElementById("J4decreaseButton").setAttribute('decrease-click', '');
      document.getElementById("J5decreaseButton").setAttribute('decrease-click', '');
      document.getElementById("J6decreaseButton").setAttribute('decrease-click', '');
      document.getElementById("JFdecreaseButton").setAttribute('decrease-click', '');
      document.getElementById("JLIKdecreaseButton").setAttribute('decrease-click', '');
      document.getElementById("JLIFdecreaseButton").setAttribute('decrease-click', '');
      document.getElementById("JRIKdecreaseButton").setAttribute('decrease-click', '');
      document.getElementById("JRIFdecreaseButton").setAttribute('decrease-click', '');
      document.getElementById("JLIKdecreaseButton").setAttribute('decrease-click', '');
      document.getElementById("G3HdecreaseButton").setAttribute('decrease-click', '');
  
      huskyFrontRightWheelValue = this.FRWvalue;
      huskyFrontLeftWheelValue = this.FLWvalue;
      huskyBackRightWheelValue = this.BRWvalue;
      huskyBackLeftWheelValue = this.BLWvalue;
      j2n6s300Joint1Value = this.JJ1value;
      j2n6s300Joint2Value = this.JJ2value;
      j2n6s300Joint3Value = this.JJ3value;
      j2n6s300Joint4Value = this.JJ4value;
      j2n6s300Joint5Value = this.JJ5value;
      j2n6s300Joint6Value = this.JJ6value;
      j2n6s300FingerJoint1Value = this.JJF1value;
      j2n6s300FingerJoint2Value = this.JJF2value;
      j2n6s300FingerJoint3Value = this.JJF3value;
      j2n6s300FingerTipJoint1Value = this.JJFT1value;
      j2n6s300FingerTipJoint2Value = this.JJFT2value;
      j2n6s300FingerTipJoint3Value = this.JJFT3value;
  
      joint1Value = this.J1value;
      joint2Value = this.J2value;
      joint3Value = this.J3value;
      joint4Value = this.J4value;
      joint5Value = this.J5value;
      joint6Value = this;J6value;
      fingerJointValue = this.JFvalue;
      jointLIFValue = this.JLIFvalue;
      jointLIKValue = this.JLIKvalue;
      jointRIFValue = this.JRIFvalue;
      jointRIKValue = this.JRIKvalue;
  
      
        }else{
          console.log("even"); //multiplayer
          document.getElementById('userToggleText').setAttribute('text', 'value', "Multi User");
          this.subscribe("FRWIncrease", "mousedown", this.increaseFRW);
      this.subscribe("FRWIncrease", "mouseup", this.mouseUp);
      this.subscribe("FRWDecrease", "mousedown", this.decreaseFRW);
      this.subscribe("FRWDecrease", "mouseup", this.mouseUp);
      this.subscribe("FLWIncrease", "mousedown", this.increaseFLW);
      this.subscribe("FLWIncrease", "mouseup", this.mouseUp);
      this.subscribe("FLWDecrease", "mousedown", this.decreaseFLW);
      this.subscribe("FLWDecrease", "mouseup", this.mouseUp);
      this.subscribe("BRWIncrease", "mousedown", this.increaseBRW);
      this.subscribe("BRWIncrease", "mouseup", this.mouseUp);
      this.subscribe("BRWDecrease", "mousedown", this.decreaseBRW);
      this.subscribe("BRWDecrease", "mouseup", this.mouseUp);
      this.subscribe("BLWIncrease", "mousedown", this.increaseBLW);
      this.subscribe("BLWIncrease", "mouseup", this.mouseUp);
      this.subscribe("BLWDecrease", "mousedown", this.decreaseBLW);
      this.subscribe("BLWDecrease", "mouseup", this.mouseUp);
      this.subscribe("JJ1Increase", "mousedown", this.increaseJJ1);
      this.subscribe("JJ1Increase", "mouseup", this.mouseUp);
      this.subscribe("JJ1Decrease", "mousedown", this.decreaseJJ1);
      this.subscribe("JJ1Decrease", "mouseup", this.mouseUp);
      this.subscribe("JJ2Increase", "mousedown", this.increaseJJ2);
      this.subscribe("JJ2Increase", "mouseup", this.mouseUp);
      this.subscribe("JJ2Decrease", "mousedown", this.decreaseJJ2);
      this.subscribe("JJ2Decrease", "mouseup", this.mouseUp);
      this.subscribe("JJ3Increase", "mousedown", this.increaseJJ3);
      this.subscribe("JJ3Increase", "mouseup", this.mouseUp);
      this.subscribe("JJ3Decrease", "mousedown", this.decreaseJJ3);
      this.subscribe("JJ3Decrease", "mouseup", this.mouseUp);
      this.subscribe("JJ4Increase", "mousedown", this.increaseJJ4);
      this.subscribe("JJ4Increase", "mouseup", this.mouseUp);
      this.subscribe("JJ4Decrease", "mousedown", this.decreaseJJ4);
      this.subscribe("JJ4Decrease", "mouseup", this.mouseUp);
      this.subscribe("JJ5Increase", "mousedown", this.increaseJJ5);
      this.subscribe("JJ5Increase", "mouseup", this.mouseUp);
      this.subscribe("JJ5Decrease", "mousedown", this.decreaseJJ5);
      this.subscribe("JJ5Decrease", "mouseup", this.mouseUp);
      this.subscribe("JJ6Increase", "mousedown", this.increaseJJ6);
      this.subscribe("JJ6Increase", "mouseup", this.mouseUp);
      this.subscribe("JJ6Decrease", "mousedown", this.decreaseJJ6);
      this.subscribe("JJ6Decrease", "mouseup", this.mouseUp);
      this.subscribe("JJF1Increase", "mousedown", this.increaseJJF1);
      this.subscribe("JJF1Increase", "mouseup", this.mouseUp);
      this.subscribe("JJF1Decrease", "mousedown", this.decreaseJJF1);
      this.subscribe("JJF1Decrease", "mouseup", this.mouseUp);
      this.subscribe("JJF2Increase", "mousedown", this.increaseJJF2);
      this.subscribe("JJF2Increase", "mouseup", this.mouseUp);
      this.subscribe("JJF2Decrease", "mousedown", this.decreaseJJF2);
      this.subscribe("JJF2Decrease", "mouseup", this.mouseUp);
      this.subscribe("JJF3Increase", "mousedown", this.increaseJJF3);
      this.subscribe("JJF3Increase", "mouseup", this.mouseUp);
      this.subscribe("JJF3Decrease", "mousedown", this.decreaseJJF3);
      this.subscribe("JJF3Decrease", "mouseup", this.mouseUp);
      this.subscribe("JJFT1Increase", "mousedown", this.increaseJJFT1);
      this.subscribe("JJFT1Increase", "mouseup", this.mouseUp);
      this.subscribe("JJFT1Decrease", "mousedown", this.decreaseJJFT1);
      this.subscribe("JJFT1Decrease", "mouseup", this.mouseUp);
      this.subscribe("JJFT2Increase", "mousedown", this.increaseJJFT2);
      this.subscribe("JJFT2Increase", "mouseup", this.mouseUp);
      this.subscribe("JJFT2Decrease", "mousedown", this.decreaseJJFT2);
      this.subscribe("JJFT2Decrease", "mouseup", this.mouseUp);
      this.subscribe("JJFT3Increase", "mousedown", this.increaseJJFT3);
      this.subscribe("JJFT3Increase", "mouseup", this.mouseUp);
      this.subscribe("JJFT3Decrease", "mousedown", this.decreaseJJFT3);
      this.subscribe("JJFT3Decrease", "mouseup", this.mouseUp);
      this.subscribe("HHIncrease", "mousedown", this.increaseHH);
      this.subscribe("HHIncrease", "mouseup", this.mouseUp);
      this.subscribe("HHDecrease", "mousedown", this.decreaseHH);
      this.subscribe("HHDecrease", "mouseup", this.mouseUp);
  
      //robot switching subscribes
      this.subscribe("gen3Button", "click", this.gen3ButtonClick);
      this.subscribe("huskyButton", "click", this.huskyButtonClick);
  
      //gen3 subscribes
      this.subscribe("J1Increase", "mousedown", this.increaseJ1);
      this.subscribe("J1Increase", "mouseup", this.mouseUp);
      this.subscribe("J1Decrease", "mousedown", this.decreaseJ1);
      this.subscribe("J1Decrease", "mouseup", this.mouseUp);
      this.subscribe("J2Increase", "mousedown", this.increaseJ2);
      this.subscribe("J2Increase", "mouseup", this.mouseUp);
      this.subscribe("J2Decrease", "mousedown", this.decreaseJ2);
      this.subscribe("J2Decrease", "mouseup", this.mouseUp);
      this.subscribe("J3Increase", "mousedown", this.increaseJ3);
      this.subscribe("J3Increase", "mouseup", this.mouseUp);
      this.subscribe("J3Decrease", "mousedown", this.decreaseJ3);
      this.subscribe("J3Decrease", "mouseup", this.mouseUp);
      this.subscribe("J4Increase", "mousedown", this.increaseJ4);
      this.subscribe("J4Increase", "mouseup", this.mouseUp);
      this.subscribe("J4Decrease", "mousedown", this.decreaseJ4);
      this.subscribe("J4Decrease", "mouseup", this.mouseUp);
      this.subscribe("J5Increase", "mousedown", this.increaseJ5);
      this.subscribe("J5Increase", "mouseup", this.mouseUp);
      this.subscribe("J5Decrease", "mousedown", this.decreaseJ5);
      this.subscribe("J5Decrease", "mouseup", this.mouseUp);
      this.subscribe("J6Increase", "mousedown", this.increaseJ6);
      this.subscribe("J6Increase", "mouseup", this.mouseUp);
      this.subscribe("J6Decrease", "mousedown", this.decreaseJ6);
      this.subscribe("J6Decrease", "mouseup", this.mouseUp);
      this.subscribe("JFIncrease", "mousedown", this.increaseJF);
      this.subscribe("JFIncrease", "mouseup", this.mouseUp);
      this.subscribe("JFDecrease", "mousedown", this.decreaseJF);
      this.subscribe("JFDecrease", "mouseup", this.mouseUp);
      this.subscribe("JLIKIncrease", "mousedown", this.increaseJLIK);
      this.subscribe("JLIKIncrease", "mouseup", this.mouseUp);
      this.subscribe("JLIKDecrease", "mousedown", this.decreaseJLIK);
      this.subscribe("JLIKDecrease", "mouseup", this.mouseUp);
      this.subscribe("JLIFIncrease", "mousedown", this.increaseJLIF);
      this.subscribe("JLIFIncrease", "mouseup", this.mouseUp);
      this.subscribe("JLIFDecrease", "mousedown", this.decreaseJLIF);
      this.subscribe("JLIFDecrease", "mouseup", this.mouseUp);
      this.subscribe("JRIKIncrease", "mousedown", this.increaseJRIK);
      this.subscribe("JRIKIncrease", "mouseup", this.mouseUp);
      this.subscribe("JRIKDecrease", "mousedown", this.decreaseJRIK);
      this.subscribe("JRIKDecrease", "mouseup", this.mouseUp);
      this.subscribe("JRIFIncrease", "mousedown", this.increaseJRIF);
      this.subscribe("JRIFIncrease", "mouseup", this.mouseUp);
      this.subscribe("JRIFDecrease", "mousedown", this.decreaseJRIF);
      this.subscribe("JRIFDecrease", "mouseup", this.mouseUp);
      this.subscribe("G3HIncrease", "mousedown", this.increaseG3H);
      this.subscribe("G3HIncrease", "mouseup", this.mouseUp);
      this.subscribe("G3HDecrease", "mousedown", this.decreaseG3H);
      this.subscribe("G3HDecrease", "mouseup", this.mouseUp);
  
      document.getElementById("huskyButton").removeAttribute('husky-click');
      document.getElementById("gen3Button").removeAttribute('gen3-click');
      document.getElementById("FRWincreaseButton").removeAttribute('increase-click');
      document.getElementById("FLWincreaseButton").removeAttribute('increase-click');
      document.getElementById("BRWincreaseButton").removeAttribute('increase-click');
      document.getElementById("BLWincreaseButton").removeAttribute('increase-click');
      document.getElementById("JJ1increaseButton").removeAttribute('increase-click');
      document.getElementById("JJ2increaseButton").removeAttribute('increase-click');
      document.getElementById("JJ3increaseButton").removeAttribute('increase-click');
      document.getElementById("JJ4increaseButton").removeAttribute('increase-click');
      document.getElementById("JJ5increaseButton").removeAttribute('increase-click');
      document.getElementById("JJ6increaseButton").removeAttribute('increase-click');
      document.getElementById("JJF1increaseButton").removeAttribute('increase-click');
      document.getElementById("JJF2increaseButton").removeAttribute('increase-click');
      document.getElementById("JJF3increaseButton").removeAttribute('increase-click');
      document.getElementById("JJFT1increaseButton").removeAttribute('increase-click');
      document.getElementById("JJFT2increaseButton").removeAttribute('increase-click');
      document.getElementById("JJFT3increaseButton").removeAttribute('increase-click');
      document.getElementById("HHincreaseButton").removeAttribute('increase-click');
  
      document.getElementById("J1increaseButton").removeAttribute('increase-click');
      document.getElementById("J2increaseButton").removeAttribute('increase-click');
      document.getElementById("J3increaseButton").removeAttribute('increase-click');
      document.getElementById("J4increaseButton").removeAttribute('increase-click');
      document.getElementById("J5increaseButton").removeAttribute('increase-click');
      document.getElementById("J6increaseButton").removeAttribute('increase-click');
      document.getElementById("JFincreaseButton").removeAttribute('increase-click');
      document.getElementById("JLIKincreaseButton").removeAttribute('increase-click');
      document.getElementById("JLIFincreaseButton").removeAttribute('increase-click');
      document.getElementById("JRIKincreaseButton").removeAttribute('increase-click');
      document.getElementById("JRIFincreaseButton").removeAttribute('increase-click');
      document.getElementById("JLIKincreaseButton").removeAttribute('increase-click');
      document.getElementById("G3HincreaseButton").removeAttribute('increase-click');
      
  
      document.getElementById("FRWdecreaseButton").removeAttribute('decrease-click');
      document.getElementById("FLWdecreaseButton").removeAttribute('decrease-click');
      document.getElementById("BRWdecreaseButton").removeAttribute('decrease-click');
      document.getElementById("BLWdecreaseButton").removeAttribute('decrease-click');
      document.getElementById("JJ1decreaseButton").removeAttribute('decrease-click');
      document.getElementById("JJ2decreaseButton").removeAttribute('decrease-click');
      document.getElementById("JJ3decreaseButton").removeAttribute('decrease-click');
      document.getElementById("JJ4decreaseButton").removeAttribute('decrease-click');
      document.getElementById("JJ5decreaseButton").removeAttribute('decrease-click');
      document.getElementById("JJ6decreaseButton").removeAttribute('decrease-click');
      document.getElementById("JJF1decreaseButton").removeAttribute('decrease-click');
      document.getElementById("JJF2decreaseButton").removeAttribute('decrease-click');
      document.getElementById("JJF3decreaseButton").removeAttribute('decrease-click');
      document.getElementById("JJFT1decreaseButton").removeAttribute('decrease-click');
      document.getElementById("JJFT2decreaseButton").removeAttribute('decrease-click');
      document.getElementById("JJFT3decreaseButton").removeAttribute('decrease-click');
      document.getElementById("HHdecreaseButton").removeAttribute('decrease-click');
      
  
      document.getElementById("J1decreaseButton").removeAttribute('decrease-click');
      document.getElementById("J2decreaseButton").removeAttribute('decrease-click');
      document.getElementById("J3decreaseButton").removeAttribute('decrease-click');
      document.getElementById("J4decreaseButton").removeAttribute('decrease-click');
      document.getElementById("J5decreaseButton").removeAttribute('decrease-click');
      document.getElementById("J6decreaseButton").removeAttribute('decrease-click');
      document.getElementById("JFdecreaseButton").removeAttribute('decrease-click');
      document.getElementById("JLIKdecreaseButton").removeAttribute('decrease-click');
      document.getElementById("JLIFdecreaseButton").removeAttribute('decrease-click');
      document.getElementById("JRIKdecreaseButton").removeAttribute('decrease-click');
      document.getElementById("JRIFdecreaseButton").removeAttribute('decrease-click');
      document.getElementById("JLIKdecreaseButton").removeAttribute('decrease-click');
      document.getElementById("G3HdecreaseButton").removeAttribute('decrease-click');
      
        }
      }
  
      measureToggle(){
        if(this.Mcount % 2 == 1){
          this.measurement="degrees";
  
          document.getElementById("measureToggleText").setAttribute('text', 'value', "Degrees");
  
          document.getElementById("FRWvalue").setAttribute('text', 'value', (this.FRWvalue * (180/3.14)).toFixed(1));
          document.getElementById("FLWvalue").setAttribute('text', 'value', (this.FLWvalue * (180/3.14)).toFixed(1));
          document.getElementById("BRWvalue").setAttribute('text', 'value', (this.BRWvalue * (180/3.14)).toFixed(1));
          document.getElementById("BLWvalue").setAttribute('text', 'value', (this.BLWvalue * (180/3.14)).toFixed(1));
          document.getElementById("JJ1value").setAttribute('text', 'value', (this.JJ1value * (180/3.14)).toFixed(1));
          document.getElementById("JJ2value").setAttribute('text', 'value', (this.JJ2value * (180/3.14)).toFixed(1));
          document.getElementById("JJ3value").setAttribute('text', 'value', (this.JJ3value * (180/3.14)).toFixed(1));
          document.getElementById("JJ4value").setAttribute('text', 'value', (this.JJ4value * (180/3.14)).toFixed(1));
          document.getElementById("JJ5value").setAttribute('text', 'value', (this.JJ5value * (180/3.14)).toFixed(1));
          document.getElementById("JJ6value").setAttribute('text', 'value', (this.JJ6value * (180/3.14)).toFixed(1));
          document.getElementById("JJF1value").setAttribute('text', 'value', (this.JJF1value * (180/3.14)).toFixed(1));
          document.getElementById("JJF2value").setAttribute('text', 'value', (this.JJF2value * (180/3.14)).toFixed(1));
          document.getElementById("JJF3value").setAttribute('text', 'value', (this.JJF3value * (180/3.14)).toFixed(1));
          document.getElementById("JJFT1value").setAttribute('text', 'value', (this.JJFT1value * (180/3.14)).toFixed(1));
          document.getElementById("JJFT2value").setAttribute('text', 'value', (this.JJFT2value * (180/3.14)).toFixed(1));
          document.getElementById("JJFT3value").setAttribute('text', 'value', (this.JJFT3value * (180/3.14)).toFixed(1));
  
          document.getElementById("J1value").setAttribute('text', 'value', (this.J1value * (180/3.14)).toFixed(1));
          document.getElementById("J2value").setAttribute('text', 'value', (this.J2value * (180/3.14)).toFixed(1));
          document.getElementById("J3value").setAttribute('text', 'value', (this.J3value * (180/3.14)).toFixed(1));
          document.getElementById("J4value").setAttribute('text', 'value', (this.J4value * (180/3.14)).toFixed(1));
          document.getElementById("J5value").setAttribute('text', 'value', (this.J5value * (180/3.14)).toFixed(1));
          document.getElementById("J6value").setAttribute('text', 'value', (this.J6value * (180/3.14)).toFixed(1));
          document.getElementById("JFvalue").setAttribute('text', 'value', (this.JFvalue * (180/3.14)).toFixed(1));
          document.getElementById("JLIKvalue").setAttribute('text', 'value', (this.JLIKvalue * (180/3.14)).toFixed(1));
          document.getElementById("JLIFvalue").setAttribute('text', 'value', (this.JLIFvalue * (180/3.14)).toFixed(1));
          document.getElementById("JRIKvalue").setAttribute('text', 'value', (this.JRIKvalue * (180/3.14)).toFixed(1));
          document.getElementById("JRIFvalue").setAttribute('text', 'value', (this.JRIFvalue * (180/3.14)).toFixed(1));
  
        console.log("degrees");
        }else{
          this.measurement="radians";
          console.log("radians");
  
          document.getElementById("measureToggleText").setAttribute('text', 'value', "Radians");
  
          document.getElementById("FRWvalue").setAttribute('text', 'value', this.FRWvalue.toFixed(1));
          document.getElementById("FLWvalue").setAttribute('text', 'value', this.FLWvalue.toFixed(1));
          document.getElementById("BRWvalue").setAttribute('text', 'value', this.BRWvalue.toFixed(1));
          document.getElementById("BLWvalue").setAttribute('text', 'value', this.BLWvalue.toFixed(1));
          document.getElementById("JJ1value").setAttribute('text', 'value', this.JJ1value.toFixed(1));
          document.getElementById("JJ2value").setAttribute('text', 'value', this.JJ2value.toFixed(1));
          document.getElementById("JJ3value").setAttribute('text', 'value', this.JJ3value.toFixed(1));
          document.getElementById("JJ4value").setAttribute('text', 'value', this.JJ4value.toFixed(1));
          document.getElementById("JJ5value").setAttribute('text', 'value', this.JJ5value.toFixed(1));
          document.getElementById("JJ6value").setAttribute('text', 'value', this.JJ6value.toFixed(1));
          document.getElementById("JJF1value").setAttribute('text', 'value', this.JJF1value.toFixed(1));
          document.getElementById("JJF2value").setAttribute('text', 'value', this.JJF2value.toFixed(1));
          document.getElementById("JJF3value").setAttribute('text', 'value', this.JJF3value.toFixed(1));
          document.getElementById("JJFT1value").setAttribute('text', 'value', this.JJFT1value.toFixed(1));
          document.getElementById("JJFT2value").setAttribute('text', 'value', this.JJFT2value.toFixed(1));
          document.getElementById("JJFT3value").setAttribute('text', 'value', this.JJFT3value.toFixed(1));
  
          document.getElementById("J1value").setAttribute('text', 'value', this.J1value.toFixed(1));
          document.getElementById("J2value").setAttribute('text', 'value', this.J2value.toFixed(1));
          document.getElementById("J3value").setAttribute('text', 'value', this.J3value.toFixed(1));
          document.getElementById("J4value").setAttribute('text', 'value', this.J4value.toFixed(1));
          document.getElementById("J5value").setAttribute('text', 'value', this.J5value.toFixed(1));
          document.getElementById("J6value").setAttribute('text', 'value', this.J6value.toFixed(1));
          document.getElementById("JFvalue").setAttribute('text', 'value', this.JFvalue.toFixed(1));
          document.getElementById("JLIKvalue").setAttribute('text', 'value', this.JLIKvalue.toFixed(1));
          document.getElementById("JLIFvalue").setAttribute('text', 'value', this.JLIFvalue.toFixed(1));
          document.getElementById("JRIKvalue").setAttribute('text', 'value', this.JRIKvalue.toFixed(1));
          document.getElementById("JRIFvalue").setAttribute('text', 'value', this.JRIFvalue.toFixed(1));
        }
        this.Mcount++;
       
      }

}

class RootView extends Croquet.View {

    constructor(model) {
        super(model);

        let self = this;

        this.children = {};
        this.sceneModel = model;
        this.aframeScene = document.querySelector('a-scene');
        this.aframeScene.dataset.viewId = this.viewId;
        this.aframeScene.dataset.userColor = model.userData.get(this.viewId)?.color;
        this.aframeScene.dataset.seeds = model.seeds;

        this.aframeScene.addEventListener('add-multiuser', function (event) {
            let comp = event.detail.comp;
            if (!comp.ready) {
                comp.ready = true;
                if (!Object.keys(self.children).includes(comp.el?.id)) {
                    console.debug('RootView: multiuser component ready; creating ComponentModel:', comp.el?.id, event.detail);
                    const isAvatar = comp.el?.id?.startsWith(Q.AVATAR_PREFIX);
                    const components = {};
                    for (const [componentName, componentValue] of Object.entries(comp.el.components)) {
                        const [isSyncable, substitutedValue] = filterComponent(isAvatar, componentName, componentValue?.attrValue);
                        if (isSyncable) {
                            components[componentName] = substitutedValue;
                        }
                    }
                    const modelData = {
                        elID: comp.el.id,
                        parentID: comp.el.parentEl?.id,
                        elType: comp.el.localName,
                        components,
                    };
                    self.publish(model.id, "add-multiuser-model", modelData);
                }
            }
        });

        this.aframeScene.addEventListener('deleteComponent', function (event) {

            let data = event.detail.data;
            console.debug('Deleting multiuser component from scene: ', data);
            self.removeChild(data);
            self.publish(model.id, 'delete-multiuser-model', data);

        })

        this.aframeScene.addEventListener('updateOptions', (evnt) => {
            self.publish(model.id, 'updateOptions', event.detail);
        });

        this.subscribe(this.sessionId, 'user-added', this.onUserAdded);
        this.subscribe(this.sessionId, 'user-exit', this.onUserExit);
        this.subscribe(model.id, 'component-added', this.addViewComponent);
        this.subscribe(model.id, 'component-deleted', this.removeChild)
        this.subscribe(this.viewId, "synced", this.synced);

        for (const [id, data] of model.userData.entries()) {
            if (data?.online) {
                this.addViewComponent(Q.AVATAR_PREFIX + id);
            } else {
                this.removeChild(Q.AVATAR_PREFIX + id);
            }
        }

        
            
            
            this.i = 0;
        
            //husky publishes
            document.getElementById("FRWincreaseButton").addEventListener("mousedown", ()=>{
              this.publish("FRWIncrease", "mousedown");
            });
            document.getElementById("FRWincreaseButton").addEventListener("mouseup", ()=>{
              this.publish("FRWIncrease", "mouseup");
            });
            
        
            document.getElementById("FRWdecreaseButton").addEventListener("mousedown", ()=>{
              this.publish("FRWDecrease", "mousedown");
            });
            document.getElementById("FRWdecreaseButton").addEventListener("mouseup", ()=>{
              this.publish("FRWDecrease", "mouseup");
            });
        
            document.getElementById("FLWincreaseButton").addEventListener("mousedown", ()=>{
              this.publish("FLWIncrease", "mousedown");
            });
            document.getElementById("FLWincreaseButton").addEventListener("mouseup", ()=>{
              this.publish("FLWIncrease", "mouseup");
            });
        
            document.getElementById("FLWdecreaseButton").addEventListener("mousedown", ()=>{
              this.publish("FLWDecrease", "mousedown");
            });
            document.getElementById("FLWdecreaseButton").addEventListener("mouseup", ()=>{
              this.publish("FLWDecrease", "mouseup");
            });
        
            document.getElementById("BRWincreaseButton").addEventListener("mousedown", ()=>{
              this.publish("BRWIncrease", "mousedown");
            });
            document.getElementById("BRWincreaseButton").addEventListener("mouseup", ()=>{
              this.publish("BRWIncrease", "mouseup");
            });
        
            document.getElementById("BRWdecreaseButton").addEventListener("mousedown", ()=>{
              this.publish("BRWDecrease", "mousedown");
            });
            document.getElementById("BRWdecreaseButton").addEventListener("mouseup", ()=>{
              this.publish("BRWDecrease", "mouseup");
            });
        
            document.getElementById("BLWincreaseButton").addEventListener("mousedown", ()=>{
              this.publish("BLWIncrease", "mousedown");
            });
            document.getElementById("BLWincreaseButton").addEventListener("mouseup", ()=>{
              this.publish("BLWIncrease", "mouseup");
            });
        
            document.getElementById("BLWdecreaseButton").addEventListener("mousedown", ()=>{
              this.publish("BLWDecrease", "mousedown");
            });
            document.getElementById("BLWdecreaseButton").addEventListener("mouseup", ()=>{
              this.publish("BLWDecrease", "mouseup");
            });
        
            document.getElementById("JJ1increaseButton").addEventListener("mousedown", ()=>{
              this.publish("JJ1Increase", "mousedown");
            });
            document.getElementById("JJ1increaseButton").addEventListener("mouseup", ()=>{
              this.publish("JJ1Increase", "mouseup");
            });
        
            document.getElementById("JJ1decreaseButton").addEventListener("mousedown", ()=>{
              this.publish("JJ1Decrease", "mousedown");
            });
            document.getElementById("JJ1decreaseButton").addEventListener("mouseup", ()=>{
              this.publish("JJ1Decrease", "mouseup");
            });
        
            document.getElementById("JJ2increaseButton").addEventListener("mousedown", ()=>{
              this.publish("JJ2Increase", "mousedown");
            });
            document.getElementById("JJ2increaseButton").addEventListener("mouseup", ()=>{
              this.publish("JJ2Increase", "mouseup");
            });
        
            document.getElementById("JJ2decreaseButton").addEventListener("mousedown", ()=>{
              this.publish("JJ2Decrease", "mousedown");
            });
            document.getElementById("JJ2decreaseButton").addEventListener("mouseup", ()=>{
              this.publish("JJ2Decrease", "mouseup");
            });
        
            document.getElementById("JJ3increaseButton").addEventListener("mousedown", ()=>{
              this.publish("JJ3Increase", "mousedown");
            });
            document.getElementById("JJ3increaseButton").addEventListener("mouseup", ()=>{
              this.publish("JJ3Increase", "mouseup");
            });
        
            document.getElementById("JJ3decreaseButton").addEventListener("mousedown", ()=>{
              this.publish("JJ3Decrease", "mousedown");
            });
            document.getElementById("JJ3decreaseButton").addEventListener("mouseup", ()=>{
              this.publish("JJ3Decrease", "mouseup");
            });
        
            document.getElementById("JJ4increaseButton").addEventListener("mousedown", ()=>{
              this.publish("JJ4Increase", "mousedown");
            });
            document.getElementById("JJ4increaseButton").addEventListener("mouseup", ()=>{
              this.publish("JJ4Increase", "mouseup");
            });
        
            document.getElementById("JJ4decreaseButton").addEventListener("mousedown", ()=>{
              this.publish("JJ4Decrease", "mousedown");
            });
            document.getElementById("JJ4decreaseButton").addEventListener("mouseup", ()=>{
              this.publish("JJ4Decrease", "mouseup");
            });
        
            document.getElementById("JJ5increaseButton").addEventListener("mousedown", ()=>{
              this.publish("JJ5Increase", "mousedown");
            });
            document.getElementById("JJ5increaseButton").addEventListener("mouseup", ()=>{
              this.publish("JJ5Increase", "mouseup");
            });
        
            document.getElementById("JJ5decreaseButton").addEventListener("mousedown", ()=>{
              this.publish("JJ5Decrease", "mousedown");
            });
            document.getElementById("JJ5decreaseButton").addEventListener("mouseup", ()=>{
              this.publish("JJ5Decrease", "mouseup");
            });
        
            document.getElementById("JJ6increaseButton").addEventListener("mousedown", ()=>{
              this.publish("JJ6Increase", "mousedown");
            });
            document.getElementById("JJ6increaseButton").addEventListener("mouseup", ()=>{
              this.publish("JJ6Increase", "mouseup");
            });
        
            document.getElementById("JJ6decreaseButton").addEventListener("mousedown", ()=>{
              this.publish("JJ6Decrease", "mousedown");
            });
            document.getElementById("JJ6decreaseButton").addEventListener("mouseup", ()=>{
              this.publish("JJ6Decrease", "mouseup");
            });
        
            document.getElementById("JJF1increaseButton").addEventListener("mousedown", ()=>{
              this.publish("JJF1Increase", "mousedown");
            });
            document.getElementById("JJF1increaseButton").addEventListener("mouseup", ()=>{
              this.publish("JJF1Increase", "mouseup");
            });
        
            document.getElementById("JJF1decreaseButton").addEventListener("mousedown", ()=>{
              this.publish("JJF1Decrease", "mousedown");
            });
            document.getElementById("JJF1decreaseButton").addEventListener("mouseup", ()=>{
              this.publish("JJF1Decrease", "mouseup");
            });
        
            document.getElementById("JJF2increaseButton").addEventListener("mousedown", ()=>{
              this.publish("JJF2Increase", "mousedown");
            });
            document.getElementById("JJF2increaseButton").addEventListener("mouseup", ()=>{
              this.publish("JJF2Increase", "mouseup");
            });
        
            document.getElementById("JJF2decreaseButton").addEventListener("mousedown", ()=>{
              this.publish("JJF2Decrease", "mousedown");
            });
            document.getElementById("JJF2decreaseButton").addEventListener("mouseup", ()=>{
              this.publish("JJF2Decrease", "mouseup");
            });
        
            document.getElementById("JJF3increaseButton").addEventListener("mousedown", ()=>{
              this.publish("JJF3Increase", "mousedown");
            });
            document.getElementById("JJF3increaseButton").addEventListener("mouseup", ()=>{
              this.publish("JJF3Increase", "mouseup");
            });
        
            document.getElementById("JJF3decreaseButton").addEventListener("mousedown", ()=>{
              this.publish("JJF3Decrease", "mousedown");
            });
            document.getElementById("JJF3decreaseButton").addEventListener("mouseup", ()=>{
              this.publish("JJF3Decrease", "mouseup");
            });
        
            document.getElementById("JJFT1increaseButton").addEventListener("mousedown", ()=>{
              this.publish("JJFT1Increase", "mousedown");
            });
            document.getElementById("JJFT1increaseButton").addEventListener("mouseup", ()=>{
              this.publish("JJFT1Increase", "mouseup");
            });
        
            document.getElementById("JJFT1decreaseButton").addEventListener("mousedown", ()=>{
              this.publish("JJFT1Decrease", "mousedown");
            });
            document.getElementById("JJFT1decreaseButton").addEventListener("mouseup", ()=>{
              this.publish("JJFT1Decrease", "mouseup");
            });
            
            document.getElementById("JJFT2increaseButton").addEventListener("mousedown", ()=>{
              this.publish("JJFT2Increase", "mousedown");
            });
            document.getElementById("JJFT2increaseButton").addEventListener("mouseup", ()=>{
              this.publish("JJFT2Increase", "mouseup");
            });
        
            document.getElementById("JJFT2decreaseButton").addEventListener("mousedown", ()=>{
              this.publish("JJFT2Decrease", "mousedown");
            });
            document.getElementById("JJFT2decreaseButton").addEventListener("mouseup", ()=>{
              this.publish("JJFT2Decrease", "mouseup");
            });
        
            document.getElementById("JJFT3increaseButton").addEventListener("mousedown", ()=>{
              this.publish("JJFT3Increase", "mousedown");
            });
            document.getElementById("JJFT3increaseButton").addEventListener("mouseup", ()=>{
              this.publish("JJFT3Increase", "mouseup");
            });
        
            document.getElementById("JJFT3decreaseButton").addEventListener("mousedown", ()=>{
              this.publish("JJFT3Decrease", "mousedown");
            });
            document.getElementById("JJFT3decreaseButton").addEventListener("mouseup", ()=>{
              this.publish("JJFT3Decrease", "mouseup");
            });
        
            document.getElementById("HHincreaseButton").addEventListener("mousedown", ()=>{
              this.publish("HHIncrease", "mousedown");
            });
            document.getElementById("HHincreaseButton").addEventListener("mouseup", ()=>{
              this.publish("HHIncrease", "mouseup");
            });
        
            document.getElementById("HHdecreaseButton").addEventListener("mousedown", ()=>{
              this.publish("HHDecrease", "mousedown");
            });
            document.getElementById("HHdecreaseButton").addEventListener("mouseup", ()=>{
              this.publish("HHDecrease", "mouseup");
            });
        
            //robot switching button publish
            document.getElementById("gen3Button").addEventListener("click", ()=> {
              this.publish("gen3Button", "click");
            })
        
            document.getElementById("huskyButton").addEventListener("click", () => {
              this.publish("huskyButton", "click");
            });
        
            //gen3 publishes
            document.getElementById("J1increaseButton").addEventListener("mousedown", ()=>{
              this.publish("J1Increase", "mousedown");
            });
            document.getElementById("J1increaseButton").addEventListener("mouseup", ()=>{
              this.publish("J1Increase", "mouseup");
            });
        
            document.getElementById("J1decreaseButton").addEventListener("mousedown", ()=>{
              this.publish("J1Decrease", "mousedown");
            });
            document.getElementById("J1decreaseButton").addEventListener("mouseup", ()=>{
              this.publish("J1Decrease", "mouseup");
            });
        
            document.getElementById("J2increaseButton").addEventListener("mousedown", ()=>{
              this.publish("J2Increase", "mousedown");
            });
            document.getElementById("J2increaseButton").addEventListener("mouseup", ()=>{
              this.publish("J2Increase", "mouseup");
            });
        
            document.getElementById("J2decreaseButton").addEventListener("mousedown", ()=>{
              this.publish("J2Decrease", "mousedown");
            });
            document.getElementById("J2decreaseButton").addEventListener("mouseup", ()=>{
              this.publish("J2Decrease", "mouseup");
            });
        
            document.getElementById("J3increaseButton").addEventListener("mousedown", ()=>{
              this.publish("J3Increase", "mousedown");
            });
            document.getElementById("J3increaseButton").addEventListener("mouseup", ()=>{
              this.publish("J3Increase", "mouseup");
            });
        
            document.getElementById("J3decreaseButton").addEventListener("mousedown", ()=>{
              this.publish("J3Decrease", "mousedown");
            });
            document.getElementById("J3decreaseButton").addEventListener("mouseup", ()=>{
              this.publish("J3Decrease", "mouseup");
            });
        
            document.getElementById("J4increaseButton").addEventListener("mousedown", ()=>{
              this.publish("J4Increase", "mousedown");
            });
            document.getElementById("J4increaseButton").addEventListener("mouseup", ()=>{
              this.publish("J4Increase", "mouseup");
            });
        
            document.getElementById("J4decreaseButton").addEventListener("mousedown", ()=>{
              this.publish("J4Decrease", "mousedown");
            });
            document.getElementById("J4decreaseButton").addEventListener("mouseup", ()=>{
              this.publish("J4Decrease", "mouseup");
            });
        
            document.getElementById("J5increaseButton").addEventListener("mousedown", ()=>{
              this.publish("J5Increase", "mousedown");
            });
            document.getElementById("J5increaseButton").addEventListener("mouseup", ()=>{
              this.publish("J5Increase", "mouseup");
            });
        
            document.getElementById("J5decreaseButton").addEventListener("mousedown", ()=>{
              this.publish("J5Decrease", "mousedown");
            });
            document.getElementById("J5decreaseButton").addEventListener("mouseup", ()=>{
              this.publish("J5Decrease", "mouseup");
            });
        
            document.getElementById("J6increaseButton").addEventListener("mousedown", ()=>{
              this.publish("J6Increase", "mousedown");
            });
            document.getElementById("J6increaseButton").addEventListener("mouseup", ()=>{
              this.publish("J6Increase", "mouseup");
            });
        
            document.getElementById("J6decreaseButton").addEventListener("mousedown", ()=>{
              this.publish("J6Decrease", "mousedown");
            });
            document.getElementById("J6decreaseButton").addEventListener("mouseup", ()=>{
              this.publish("J6Decrease", "mouseup");
            });
        
            document.getElementById("JFincreaseButton").addEventListener("mousedown", ()=>{
              this.publish("JFIncrease", "mousedown");
            });
            document.getElementById("JFincreaseButton").addEventListener("mouseup", ()=>{
              this.publish("JFIncrease", "mouseup");
            });
        
            document.getElementById("JFdecreaseButton").addEventListener("mousedown", ()=>{
              this.publish("JFDecrease", "mousedown");
            });
            document.getElementById("JFdecreaseButton").addEventListener("mouseup", ()=>{
              this.publish("JFDecrease", "mouseup");
            });
        
            document.getElementById("JLIKincreaseButton").addEventListener("mousedown", ()=>{
              this.publish("JLIKIncrease", "mousedown");
            });
            document.getElementById("JLIKincreaseButton").addEventListener("mouseup", ()=>{
              this.publish("JLIKIncrease", "mouseup");
            });
        
            document.getElementById("JLIKdecreaseButton").addEventListener("mousedown", ()=>{
              this.publish("JLIKDecrease", "mousedown");
            });
            document.getElementById("JLIKdecreaseButton").addEventListener("mouseup", ()=>{
              this.publish("JLIKDecrease", "mouseup");
            });
        
            document.getElementById("JLIFincreaseButton").addEventListener("mousedown", ()=>{
              this.publish("JLIFIncrease", "mousedown");
            });
            document.getElementById("JLIFincreaseButton").addEventListener("mouseup", ()=>{
              this.publish("JLIFIncrease", "mouseup");
            });
        
            document.getElementById("JLIFdecreaseButton").addEventListener("mousedown", ()=>{
              this.publish("JLIFDecrease", "mousedown");
            });
            document.getElementById("JLIFdecreaseButton").addEventListener("mouseup", ()=>{
              this.publish("JLIFDecrease", "mouseup");
            });
        
            document.getElementById("JRIKincreaseButton").addEventListener("mousedown", ()=>{
              this.publish("JRIKIncrease", "mousedown");
            });
            document.getElementById("JRIKincreaseButton").addEventListener("mouseup", ()=>{
              this.publish("JRIKIncrease", "mouseup");
            });
        
            document.getElementById("JRIKdecreaseButton").addEventListener("mousedown", ()=>{
              this.publish("JRIKDecrease", "mousedown");
            });
            document.getElementById("JRIKdecreaseButton").addEventListener("mouseup", ()=>{
              this.publish("JRIKDecrease", "mouseup");
            });
        
            document.getElementById("JRIFincreaseButton").addEventListener("mousedown", ()=>{
              this.publish("JRIFIncrease", "mousedown");
            });
            document.getElementById("JRIFincreaseButton").addEventListener("mouseup", ()=>{
              this.publish("JRIFIncrease", "mouseup");
            });
        
            document.getElementById("JRIFdecreaseButton").addEventListener("mousedown", ()=>{
              this.publish("JRIFDecrease", "mousedown");
            });
            document.getElementById("JRIFdecreaseButton").addEventListener("mouseup", ()=>{
              this.publish("JRIFDecrease", "mouseup");
            });
        
            document.getElementById("G3HincreaseButton").addEventListener("mousedown", ()=>{
              this.publish("G3HIncrease", "mousedown");
            });
            document.getElementById("G3HincreaseButton").addEventListener("mouseup", ()=>{
              this.publish("G3HIncrease", "mouseup");
            });
        
            document.getElementById("G3HdecreaseButton").addEventListener("mousedown", ()=>{
              this.publish("G3HDecrease", "mousedown");
            });
            document.getElementById("G3HdecreaseButton").addEventListener("mouseup", ()=>{
              this.publish("G3HDecrease", "mouseup");
            });
        
            //reset button
            document.getElementById("resetButton").addEventListener("click", ()=>{
              this.publish("reset", "reset");
            })
        
            //user toggle
            document.getElementById("userToggle").addEventListener("click", ()=>{
              this.publish("user", "toggle");
            })
        
            //measure toggle
            document.getElementById("measureToggle").addEventListener("click", ()=>{
              this.publish("measure", "toggle");
            })

            
    }

    addViewComponent(elID) {

        if (!Object.keys(this.children).includes(elID)) {
            let component = this.sceneModel.children.get(elID);
            console.debug('RootView: adding view component:', elID, component);
            let componentView = new ComponentView(component);
            this.children[elID] = componentView;
        } else {
            console.debug('RootView: View component exists:', elID);
        }
    }

    synced() {
        console.info('RootView: synced: creating views for models:', this.sceneModel.children);
        for (const el of this.sceneModel.children.keys()) {
            this.addViewComponent(el);
        }
    }

    onUserAdded(id) {
    }

    onUserExit(id) {
    }

    removeChild(childID) {
        const child = this.children[childID];
        child?.detach();
        delete this.children[childID];
    }

    detach() {
        super.detach();
        Object.keys(this.children).forEach(key => {
            this.removeChild(key)
        })
    }

}

class ComponentModel extends Croquet.Model {
    static types() {
        return {
            "THREE.Quaternion": {
                cls: THREE.Quaternion,
                write: q => [q.x, q.y, q.z, q.w],        // serialized as '[...,...,...,...]'
                read: q => new THREE.Quaternion(q[0], q[1], q[2], q[3]),
            },
        }
    }

    init(options) {
        super.init(options);

        this.components = {   // position, rotation, etc. will be saved here
            multiuser: {
                anim: false
            }
        };
        Object.assign(this, options);

        this.sceneModel = this.wellKnownModel("modelRoot");
        this.subscribe(this.id, 'changeComponent', this.changeComponent);
        this.future(Q.STEP_MS).step();

    }

    step() {

        if (this.components.multiuser?.anim) {
            this.rotate()
        }
        this.future(Q.STEP_MS).step();

    }

    rotate() {
        let t = this.now()
        let rot = this.components.rotation;
        if (this.components.rotation) {
            let newRotation =
            {
                rotation:
                    { x: rot.x, y: Math.sin(t / 1000) * 50, z: Math.sin(t / 2000) * 30 }
            };
            this.changeComponent({ data: newRotation, senderId: 'model' });
        }
    }

    merge(target, source) {
        for (const [key, value] of Object.entries(source)) {
            if (Array.isArray(value) ||
                    value instanceof THREE.Quaternion) {
                target[key] = value;
            } else if (value instanceof Object) {
                if (!(target[key] instanceof Object)) {
                    target[key] = {}
                }
                this.merge(target[key], value);
            } else {
                target[key] = value;
            }
        }
    }

    changeComponent(changed) {
        //update model components
        this.merge(this.components, changed.data);
        this.publish(this.id, 'modelChanged', { senderId: changed.senderId, data: changed.data });
        //console.log('ComponentModel: Model is changed with: ', diff, ' from ', changed.senderId);
    }
}


class ComponentView extends Croquet.View {

    constructor(model) {
        super(model);

        console.debug(`ComponentView: constructing from`, model);
        this.elementModel = model;
        this.aframeScene = document.querySelector('a-scene');
        if (this.elementModel.elID) {
            this.aframeEl = this.aframeScene.querySelector('#' + this.elementModel.elID);
        } else {
            throw new Error(`multiuser element must have id:` + this.elementModel);
        }
        this.handlers = {   // addEventListener won't add an identical function twice
            onSetAttribute: this.onSetAttribute.bind(this),
        }

        this.subscribe(model.id, { event: 'modelChanged', handling: 'oncePerFrame' }, this.changeView);

        if (Object.entries(model.components).length > 1) {   // model has data
            // TODO: find better way to ensure ComponentViews get initialized, and with current data
            this.subscribe(this.viewId, "synced", this.initViewFromModel);
            setTimeout(this.initViewFromModel.bind(this), 1000);
        } else {   // model doesn't have data, so pull from A-Frame element
            this.initViewFromAFrame();
        }
    }

    initViewFromModel() {
        if (this.isInitialized) { return; }
        console.info('ComponentView: init A-Frame element from model:', this.elementModel);

        if (! this.aframeEl) {
            this.aframeEl = this.createElement(this.elementModel);
        } else {
            // set from model components
            this.aframeEl.emit('update-aframe-element', {data: this.elementModel.components});
        }
        this.aframeEl.addEventListener('setAttribute-event', this.handlers.onSetAttribute);

        this.isInitialized = true;
    }

    createElement(model) {
        let element;
        
            const avatarId = model.elID.slice(Q.AVATAR_PREFIX.length);
            if (avatarId === this.viewId) {   // the local user
                console.debug(`ComponentView: creating avatar for local user ${model.color} ${avatarId}`);
                element = document.createElement('a-box');
                element.setAttribute('width', 0.5);
                element.setAttribute('depth', 0.5);
                element.setAttribute('wireframe', true);
                element.setAttribute('visible', false);
                element.dataset.isLocalAvatar = true;
            } else {
                console.debug(`ComponentView: creating avatar for remote user ${model.color} ${avatarId}`);
                const avatarTemplate = document.getElementById('avatarTemplate');
                element = avatarTemplate ?
                    avatarTemplate.content.firstElementChild.cloneNode(true) :
                    document.createElement('a-box');
            }
            element.setAttribute('id', model.elID);
            const pos = model.components.position;   // TODO: use toAFrameValue()
            element.setAttribute('position', `${pos.x} ${pos.y} ${pos.z}`);
            const rot = model.components.rotation;
            element.setAttribute('rotation', `${rot.x} ${rot.y} ${rot.z}`);
            element.setAttribute('color', model.color);
            // multiuser may need to be set last
            element.setAttribute('multiuser', AFRAME.utils.styleParser.stringify(model.components.multiuser));
        
        
        const parent = document.getElementById(model.parentID);
        if (parent) {
            parent.appendChild(element);
            console.debug(`ComponentView: added element:`, element, `as child of`, parent);
        } else {
            AFRAME.scenes[0].appendChild(element);
            console.debug(`ComponentView: added element to scene:`, element);
        }
        return element;
    }

    initViewFromAFrame() {
        if (!this.aframeEl) {
            console.error(`ComponentView: need A-Frame element to init empty ComponentModel:`, this.elementModel?.elType, this.elementModel?.elID);
            return;
        }
        console.info('ComponentView: init ComponentModel from A-Frame element:', this.aframeEl);

        this.aframeEl.addEventListener('setAttribute-event', this.handlers.onSetAttribute);

        let newModelComponents = {};
        let elementComponents = this.aframeEl?.components;
        const isAvatar = this.elementModel?.elID?.startsWith(Q.AVATAR_PREFIX);

        // Filters component values & replaces elements with IDs, so the model can save them
        Object.keys(elementComponents).forEach(componentName => {
            const prop = this.aframeEl?.getAttribute(componentName);
            const [isSyncable, substitutedValue] = filterComponent(isAvatar, componentName, prop);
            if (isSyncable) {
                newModelComponents[componentName] = substitutedValue;
            }
        })
        this.publish(this.elementModel.id, 'changeComponent', { data: newModelComponents, senderId: this.viewId });
    }

    onSetAttribute(event) {
        const isAvatar = this.elementModel?.elID?.startsWith(Q.AVATAR_PREFIX);
        let data = event.detail.data;
        const [isSyncable, substitutedValue] = filterComponent(isAvatar, data.attrName, data.value);
        if (isSyncable) {
            this.publish(this.elementModel.id, 'changeComponent', { data: { [data.attrName]: substitutedValue }, senderId: this.viewId });
        }
    }

    changeView(changed) {
        if (this.aframeEl) {
            this.aframeEl.emit('update-aframe-element', {data: changed.data});
        } else {
            console.warn(`ComponentView: can't update non-existent element:`, this.elementModel?.elID);
        }
    }

    detach() {
        super.detach();

        if (this.aframeEl) {
            try {
                console.debug(`ComponentView: removing element ${this.elementModel?.elID} and view`);
                this.aframeEl.parentNode.removeChild(this.aframeEl);
                this.aframeEl.destroy();
            } catch (err) {
                console.error(`while removing A-Frame element:`, err);
            }
        } else {
            console.warn(`ComponentView: can't remove non-existent element ${this.elementModel?.elID}`);
        }
    }
}

function filterComponent(isAvatar, componentName, componentValue) {
    if (!isAvatar || Q.SYNCABLE_ATTRIBUTES.includes(componentName)) {
        try {
            if (componentValue?.attrName === componentName) {
                console.warn(`component ${componentName} was passed with outer object`)
                return [true, substitute(componentValue?.attrValue, [componentValue?.attrValue])];
            } else {
                return [true, substitute(componentValue, [componentValue])];
            }
        } catch (err) {
            console.error(`ComponentView: while copying component ${componentName}:`, componentValue, err);
            return [false, null];
        }
    } else {
        console.debug(`ComponentView: not setting non-syncable ${componentName} to`, componentValue);
        return [false, null];
    }
}

function substitute(inputValue, stack) {
    if (inputValue instanceof HTMLElement) {   // presumably an asset
        return '#' + inputValue.id;
    } else if (Array.isArray(inputValue) ||
      inputValue instanceof THREE.Quaternion) {
        return inputValue;
    } else if (inputValue && 'object' === typeof inputValue) {
        const substitutedProp = {};
        for (const [key, value] of Object.entries(inputValue)) {
            if ('function' === typeof value) {   // functions aren't serializable
                continue;
            }
            if (stack.includes(value)) {   // doesn't allow cyclic structures
                continue;
            }
            substitutedProp[key] = substitute(value, [...stack, value]);
        }
        return substitutedProp;
    } else {
        return inputValue;
    }
}



ComponentModel.register("ComponentModel");
RootModel.register("RootModel");


AFRAME.registerComponent('croquet', {

    schema: {
        sessionName: { default: 'demo' },
        password: { default: 'demo' },
        apiKey: {default: 'myApiKey'},
        spawnPoint: {type: 'vec3'},
    },

    init: function () {
        //Croquet.startSession(this.data.sessionName, RootModel, RootView);
        //Croquet.startSession(this.data.sessionName, RootModel, RootView, { step: "manual" })
        //let sessionName = this.data.sessionName == 'demo' ? Croquet.App.autoSession() : this.data.sessionName;
        //let password = this.data.password == 'demo' ? Croquet.App.autoPassword() : this.data.password;
        let apiKey = this.data.apiKey == 'myApiKey' ? '1MAgJydFdvcKpGkHe7bhxLmr3Hj4mofPKvC06mpII' : this.data.apiKey;
        Croquet.Session.join({
            apiKey: '1BnN4MOyI2yEFd0lIzuGNaJjoPGB9e2djtPutg8lx',
            appId: 'com.gmail.leodoyle05.myapp',
            sessionName: 'robotsBehindCurtains',
            password: '1234',
            model: RootModel,
            debug: [, "subscribe", ],
            view: RootView,
            options: {spawnPoint: this.data.spawnPoint},
        }
        ).then(session => {
            let self = this;
            let xrSession = null;

            function renderFrame(time, xrFrame) {
                session.step(time);
            }

            function onWindowAnimationFrame(time) {
                window.requestAnimationFrame(onWindowAnimationFrame);
                if (!xrSession) {
                    renderFrame(time, null)
                }
            }
            window.requestAnimationFrame(onWindowAnimationFrame)

            function onXRAnimationFrame(time, xrFrame) {
                if(xrSession) {
                    xrSession.requestAnimationFrame(onXRAnimationFrame);
                    renderFrame(time, xrFrame);
                }
            }

            function startXRSession() {
                if (self.el.xrSession) {
                    xrSession = self.el.xrSession
                    xrSession.requestAnimationFrame(onXRAnimationFrame)
                }
            }

            function onXRSessionEnded() {
                xrSession = null
            }

            this.el.addEventListener('enter-vr', startXRSession);
            this.el.addEventListener('exit-vr', onXRSessionEnded);

        });
    },

    update: function (oldData) {
        const options = {};
        if (! AFRAME.utils.deepEqual(this.data.spawnPoint, oldData.spawnPoint)) {
            options.spawnPoint = this.data.spawnPoint;
        }
        if (Object.keys(options).length > 0) {
            this.el.emit('updateOptions', options, false);
        }
        //TODO: create new user-defined sessions
    },

    tick: function (t) {
    }
})



AFRAME.registerComponent('multiuser', {

    schema: {
        anim: { type: 'boolean', default: false }
    },

    init: function () {
        let self = this;
        this.scene = this.el.sceneEl;
        this.ready = false;
        // Alas, this throttling won't be coordinated with Croquet frames
        this.updateViewThrottled = {};
        for (const attrName of Q.THROTTLED_ATTRIBUTES) {
            this.updateViewThrottled[attrName] = AFRAME.utils.throttle(this.updateView, Q.STEP_MS, this);
        }

        if (this.el.dataset.isLocalAvatar) {
            this.cameraEnt = this.scene.querySelector('[camera]');
            this.rigEnt = this.cameraEnt?.parentElement;
            if ('A-SCENE' === this.rigEnt.nodeName) {
                this.rigEnt = this.cameraEnt;
            }

            const position = structuredClone(this.el.components.position?.attrValue);
            if (Number.isFinite(position?.x) && Number.isFinite(position?.y) && Number.isFinite(position?.z)) {
                position.y -= Q.CAMERA_HEIGHT;
                console.info(`multiuser: from avatar, setting rig position to`, position);
                this.rigEnt.setAttribute('position', position);
            } else {
                console.warn(`multiuser: bad position of avatar:`, position);
            }

            const qCamera = new THREE.Quaternion();
            qCamera.copy(this.cameraEnt.object3D.quaternion);
            qCamera.invert();
            const q = new THREE.Quaternion();
            q.setFromEuler(new THREE.Euler(
                THREE.MathUtils.degToRad(this.el.components.rotation?.attrValue?.x),
                THREE.MathUtils.degToRad(this.el.components.rotation?.attrValue?.y),
                THREE.MathUtils.degToRad(this.el.components.rotation?.attrValue?.z),
                'XYZ'));
            q.multiply(Q.FLIP_Z_INV);
            q.multiply(qCamera);
            if (Number.isFinite(q.x) && Number.isFinite(q.y) && Number.isFinite(q.z) && Number.isFinite(q.w)) {
                this.rigEnt.object3D.quaternion.copy(q);
                console.info(`multiuser: from avatar, setting quaternion of rig to:`, q);
            } else {
                console.warn(`multiuser: bad rotation of avatar or quaternion of camera:`, q, qCamera);
            }
        }

        Reflect.defineProperty(this.el,
            'setAttributeAFrame', {
            value: (this.originalSetAttribute)(),
            writable: true
        }
        )

        Reflect.defineProperty(this.el,
            'setAttribute', {
            value: (this.croquetSetAttribute)(),
            writable: true
        }
        )

        this.el.addEventListener('update-aframe-element', function (event) {
            for (const [key, value] of Object.entries(event.detail.data)) {
                self.el.setAttributeAFrame(key, toAFrameValue(key, value));
                // console.log('multiuser component: Set attribute on element from model: ', key, ' with: ', value)
            }
        })
    },

    //Original definition from A-Frame master
    originalSetAttribute: function () {
        var singlePropUpdate = {};
        var MULTIPLE_COMPONENT_DELIMITER = '__';
        var COMPONENTS = AFRAME.components;

        return function (attrName, arg1, arg2) {
            var newAttrValue;
            var clobber;
            var componentName;
            var delimiterIndex;
            var isDebugMode;
            var key;

            delimiterIndex = attrName.indexOf(MULTIPLE_COMPONENT_DELIMITER);
            componentName = delimiterIndex > 0 ? attrName.substring(0, delimiterIndex) : attrName;

            // Not a component. Normal set attribute.
            if (!COMPONENTS[componentName]) {
                if (attrName === 'mixin') { this.mixinUpdate(arg1); }
                ANode.prototype.setAttribute.call(this, attrName, arg1);
                return;
            }

            // Initialize component first if not yet initialized.
            if (!this.components[attrName] && this.hasAttribute(attrName)) {
                this.updateComponent(
                    attrName,
                    window.HTMLElement.prototype.getAttribute.call(this, attrName));
            }

            // Determine new attributes from the arguments
            if (typeof arg2 !== 'undefined' &&
                typeof arg1 === 'string' &&
                arg1.length > 0 &&
                typeof AFRAME.utils.styleParser.parse(arg1) === 'string') {
                // Update a single property of a multi-property component
                for (key in singlePropUpdate) { delete singlePropUpdate[key]; }
                newAttrValue = singlePropUpdate;
                newAttrValue[arg1] = arg2;
                clobber = false;
            } else {
                // Update with a value, object, or CSS-style property string, with the possiblity
                // of clobbering previous values.
                newAttrValue = arg1;
                clobber = (arg2 === true);
            }

            // Update component
            this.updateComponent(attrName, newAttrValue, clobber);

            // In debug mode, write component data up to the DOM.
            isDebugMode = this.sceneEl && this.sceneEl.getAttribute('debug');
            if (isDebugMode) { this.components[attrName].flushToDOM(); }
        };
    },

    //Modified definition from A-Frame master
    croquetSetAttribute: function () {
        var singlePropUpdate = {};
        var MULTIPLE_COMPONENT_DELIMITER = '__';
        var COMPONENTS = AFRAME.components;
        let self = this

        return function (attrName, arg1, arg2) {
            var newAttrValue;
            var clobber;
            var componentName;
            var delimiterIndex;
            var isDebugMode;
            var key;

            delimiterIndex = attrName.indexOf(MULTIPLE_COMPONENT_DELIMITER);
            componentName = delimiterIndex > 0 ? attrName.substring(0, delimiterIndex) : attrName;

            // Not a component. Normal set attribute.
            if (!COMPONENTS[componentName]) {
                if (attrName === 'mixin') { this.mixinUpdate(arg1); }
                ANode.prototype.setAttribute.call(this, attrName, arg1);
                return;
            }

            // Initialize component first if not yet initialized.
            if (!this.components[attrName] && this.hasAttribute(attrName)) {
                this.updateComponent(
                    attrName,
                    window.HTMLElement.prototype.getAttribute.call(this, attrName));
            }

            // Determine new attributes from the arguments
            if (typeof arg2 !== 'undefined' &&
                typeof arg1 === 'string' &&
                arg1.length > 0 &&
                typeof AFRAME.utils.styleParser.parse(arg1) === 'string') {
                // Update a single property of a multi-property component
                for (key in singlePropUpdate) { delete singlePropUpdate[key]; }
                newAttrValue = singlePropUpdate;
                newAttrValue[arg1] = arg2;
                clobber = false;
            } else {
                // Update with a value, object, or CSS-style property string, with the possiblity
                // of clobbering previous values.
                newAttrValue = arg1;
                clobber = (arg2 === true);
            }

            // Update component
            this.updateComponent(attrName, newAttrValue, clobber);

            if (Q.THROTTLED_ATTRIBUTES.includes(attrName)) {
                self.updateViewThrottled[attrName](attrName, newAttrValue);
            } else {
                this.emit('setAttribute-event', { data: { attrName: attrName, value: newAttrValue, clobber: clobber } }, false)
            }

            // In debug mode, write component data up to the DOM.
            isDebugMode = this.sceneEl && this.sceneEl.getAttribute('debug');
            if (isDebugMode) { this.components[attrName].flushToDOM(); }
        };
    },

    remove: function () {

        //TODO: remove component and restore AFrame default behaviour

        // Reflect.defineProperty(this.el,
        //     'setAttribute', {
        //     value: (this.originalSetAttribute)(),
        //     writable: true
        // })

        // this.scene.emit('deleteComponent', { data: this.el.id }, false);

    },

    updateView: function(attrName, value) {
        // console.debug(`multiuser component: updating ${this.el.id} ${attrName} to`, value);
        this.el.emit('setAttribute-event', {data: {attrName, value}}, false);
    },

    tick: (function () {   // Uses IIFE to allocate v only once
        const v = new THREE.Vector3();
        const q = new THREE.Quaternion();

        return function (_t, _dt) {
            if (!this.ready) {
                this.scene.emit('add-multiuser', { comp: this }, false);
            } else {
                if (this.cameraEnt) {   // then this.el is the local avatar element
                    try {
                        let cameraObject3D = this.cameraEnt.object3D;
                        v.set(0, 0, 0);
                        cameraObject3D.localToWorld(v);
                        if (Number.isFinite(v.x) && Number.isFinite(v.y) && Number.isFinite(v.z)) {
                            this.el.setAttribute('position', structuredClone(v));
                        } else {
                            console.debug(`multiuser: not updating avatar position with NaN:`, v);
                        }

                        q.setFromRotationMatrix(cameraObject3D.matrixWorld);
                        q.multiply(Q.FLIP_Z);
                        if (Number.isFinite(q.x) && Number.isFinite(q.y) && Number.isFinite(q.z) && Number.isFinite(q.w)) {
                            this.el.setAttribute('rotationquaternion', q);
                        } else {
                            console.debug(`multiuser: not updating avatar rotation with NaN:`, rotation);
                        }
                    } catch (err) {
                        console.error("while copying camera position & rotation to avatar:", err);
                    }
                }
            }
        }
    })()
})


function toAFrameValue(attrName, attrValue) {
    switch (attrName) {
        case 'position':
        case 'rotation':
        case 'scale':
            if ('string' === typeof attrValue) {
                return attrValue;
            } else {
                return `${attrValue.x} ${attrValue.y} ${attrValue.z}`;
            }
        case 'rotationquaternion':
            return attrValue;
        case 'material':
            return structuredClone(attrValue);
        default:
            if (attrValue instanceof Object) {
                return AFRAME.utils.styleParser.stringify(attrValue);
            } else {
                return attrValue;
            }
    }
}


/**
 *  Allows *setting* the rotation using a quaternion.
 *  Reading the rotation as a quaternion should still
 *  be done from el.object3D.quaternion.
 */
AFRAME.registerComponent('rotationquaternion', {

    schema: {type: 'vec4'},

    update: function (oldData) {
        // console.debug(`Updating rotationQuaternion from`, oldData, `to:`, this.data);
        if (Number.isFinite(this.data.x) && Number.isFinite(this.data.y) && Number.isFinite(this.data.z) && Number.isFinite(this.data.w)) {
            this.el.object3D.quaternion.copy(this.data);
        } else {
            console.warn(`rotationquaternion: not updating ${this.el.id} with NaN:`, this.data)
        }
    }
});
