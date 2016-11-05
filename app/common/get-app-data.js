export default () => {
  // Use mock on devserver, much faster, also good for demo site because server is not available
  if (__DEVSERVER__) {
    // eslint-disable-next-line
    return Promise.resolve({"methods":[{"class_name":"NSObject(RCSPFirstLoadMark)","file":"/root/Users/jenkins/jenkins-slave/workspace/IOS-stab_8.2.0-INHOUSE-ALL/src/RCSoftPhoneApp/main.m","method_name":"load"},{"class_name":"NSObject","file":"/root/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/SDKs/iPhoneOS9.2.sdk/usr/include/objc/NSObject.h","method_name":"load"},{"class_name":"NSObject","file":"/root/Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/SDKs/iPhoneOS9.2.sdk/usr/include/objc/NSObject.h","method_name":"initialize"}]});
  } else {
    return fetch('/app').then(res => res.json());
  }
};
