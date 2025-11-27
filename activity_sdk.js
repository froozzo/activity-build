// ===============================
// Discord Activity SDK (Local)
// ===============================

let discordSdk;
let discordUserID = null;
let discordUsername = null;

// Exponer globalmente
window.discordUserID = null;
window.discordUsername = null;

async function initDiscord() {
    const { DiscordSDK } = window;

    // Usa el ID que mandaste desde el wrapper
    discordSdk = new DiscordSDK(window.discordAppId);

    // Esperar el ready()
    await discordSdk.ready();

    // Intentar autenticar
    const auth = await discordSdk.commands.authenticate({});

    if (auth && auth.user) {
        discordUserID = auth.user.id;
        discordUsername = auth.user.username;

        window.discordUserID = discordUserID;
        window.discordUsername = discordUsername;

        console.log("✔ Autenticado en Discord");
        console.log("ID:", discordUserID);
        console.log("User:", discordUsername);

        // Enviar al juego (Godot)
        const frame = document.getElementById("game-frame");
        frame.contentWindow.postMessage(
            {
                type: "discord_auth",
                id: discordUserID,
                username: discordUsername
            },
            "*"
        );

    } else {
        console.error("❌ No se pudo autenticar con Discord Activity.");
    }
}

window.initDiscordActivity = initDiscord;
