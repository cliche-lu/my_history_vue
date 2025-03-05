import http from "../utils/api/http";

export function fetchList(params = {}, headers = {}, config = {}) {
    return http.get("/api/getList", params, headers, config);
}

export function createList(data = {}, headers = {}, config = {}) {
    return http.post("/api/postList", data, headers, config);
}


export function updateList(data = {}, headers = {}, config = {}) {
    return http.put("/api/putList", data, headers, config);
}

export function removeList(params = {}, headers = {}, config = {}) {
    return http.delete("/api/deleteList", params, headers, config);
}

export function login(data = {}) {
    return http.post("/login", data, null, null);
}

export function signIn(data = {}) {
    return http.post("/sysUser/add", data, null, null);
}


export function getList(params = {}, headers = {}, config = {}) {
    return http.get("/business/listPage", params, headers, config);
}

export function addBusinessList(params = {}, headers = {}, config = {}) {
    return http.post("/business/add", params, headers, config);
}

export function getUserList(params = {}, headers = {}, config = {}) {
    return http.get("/sysUser/getUserList", params, headers, config);
}

export function deleteBusinessList(params = '', headers = {}, config = {}) {
    return http.delete("/business/delete?id=" + params, {}, headers, config);
}

export function editBusiness(data = {}) {
    return http.post("/business/update", data, null, null);
}

export function fileUpload(data = {}) {
    return http.post("/file/upload?file=" + data, null, null, null);
}

// /levels/list

export function getLevelsList() {
    return http.get("/levels/list" , null, null, null);
}

// /sysUser/getNowLoginUser1
export function getNowLoginUser() {
    return http.get("/sysUser/getNowLoginUser1" , null, null, null);
}
// /sysUser/getTenantType
export function getTenantType() {
    return http.get("/levels/getTenantType" , null, null, null);
}