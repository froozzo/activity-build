// ======================================================
// BRIDGE OFICIAL PARA DISCORD ACTIVITIES
// ======================================================

(async () => {

    // Esperar a que Discord inyecte el SDK en window
    const DiscordSDK = window.DiscordSDK;

    if (!DiscordSDK) {
        console.error("❌ DiscordSDK no está disponible aún.");
        return;
    }

    // Inicializar SDK con tu APP ID
    const sdk = new DiscordSDK("1443000817639755947");

    await sdk.ready();

    const auth = await sdk.commands.authenticate({});

    if (auth && auth.user) {
        console.log("✅ Usuario autenticado:", auth.user.username);

        // Exportar a window para Godot
        window.discordUserID = auth.user.id;
        window.discordUsername = auth.user.username;

        // Enviar al iframe (tu juego)
        const frame = document.getElementById("game-frame").contentWindow;

        frame.postMessage({
            type: "discord-auth",
            user: auth.user
        }, "*");

    } else {
        console.error("❌ No se pudo autenticar al usuario.");
    }

})();
