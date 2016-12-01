R["updateOrCreate"] = R["upsert"];

R["update"] = R["updateAll"];

R["destroyById"] = R["deleteById"];

R["removeById"] = R["deleteById"];
R.getCachedCurrent = function () {
    var data = LoopBackAuth.currentUserData;
    return data ? new R(data) : null;
};
R.isAuthenticated = function () {
    return this.getCurrentId() != null;
};

R.getCurrentId = function () {
    return LoopBackAuth.currentUserId;
};
R.modelName = "User";

