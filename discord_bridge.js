// =========== DISCORD BRIDGE FOR GODOT ===========

let discordSdk = null;

// Inicialización del SDK Local (activity_sdk.js)
async function initDiscordSDK() {
    try {
        discordSdk = await window.discordSDK.init();
        console.log("[Bridge] Discord SDK Ready:", discordSdk);
        return true;
    } catch (err) {
        console.error("[Bridge] Error inicializando SDK:", err);
        return false;
    }
}

// Login LOCAL para actividad (NO remote)
async function discordLogin() {
    try {
        const auth = await discordSdk.commands.authenticate({
            client_id: YOUR_CLIENT_ID, // <- lo llenamos luego
            response_type: "code",
            state: "godot_login",
            scope: ["identify"]
        });

        console.log("[Bridge] Auth response:", auth);

        // Guardamos user id
        const user = await discordSdk.commands.getUser();
        console.log("[Bridge] User:", user);

        // Enviamos datos a Godot
        window.postMessage({
            type: "discord-auth",
            user_id: user.id,
            username: user.username,
            avatar: user.avatar
        });

    } catch (err) {
        console.error("[Bridge] Error en discordLogin:", err);
    }
}

// Godot pedirá el login así: external_call("discord_login")
window.addEventListener("message", (ev) => {
    if (!ev.data) return;

    if (ev.data.type === "godot-login") {
        discordLogin();
    }
});

// Inicializamos automáticamente
initDiscordSDK();
