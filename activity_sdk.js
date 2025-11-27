// ===============================
// Discord Activity SDK (Local)
// ===============================

let discordSdk;
let discordUserID = null;
let discordUsername = null;

// Exponer globalmente para Godot
window.discordUserID = null;
window.discordUsername = null;

async function initDiscord() {
    // Carga el SDK embedded
    const { DiscordSDK } = window;
    discordSdk = new DiscordSDK("your-app-id"); // <- Cambia esto en el wrapper, no aquí.

    // Inicializar
    await discordSdk.ready();

    // Autenticación del usuario dentro del Activity
    const auth = await discordSdk.commands.authenticate({});

    if (auth && auth.user) {
        discordUserID = auth.user.id;
        discordUsername = auth.user.username;

        // Exponerlo globalmente para Godot
        window.discordUserID = discordUserID;
        window.discordUsername = discordUsername;

        console.log("Discord user ID:", discordUserID);
        console.log("Discord username:", discordUsername);
    } else {
        console.error("No se pudo autenticar con Discord Activity.");
    }
}

window.initDiscordActivity = initDiscord;
