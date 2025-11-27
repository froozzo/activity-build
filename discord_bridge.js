(async () => {

    // ========== ESPERAR POR EL SDK ==========
    const waitForSDK = () => new Promise(resolve => {
        let tries = 0;
        const check = () => {
            if (window.DiscordSDK) resolve(window.DiscordSDK);
            else if (tries++ < 30) setTimeout(check, 100);
            else resolve(null);
        };
        check();
    });

    const DiscordSDK = await waitForSDK();
    if (!DiscordSDK) {
        console.error("❌ DiscordSDK no cargó.");
        return;
    }

    console.log("✅ DiscordSDK detectado");

    // ========== INICIALIZAR SDK ==========
    const sdk = new DiscordSDK("1443000817639755947");

    try {
        await Promise.race([
            sdk.ready(),
            new Promise((_, reject) => setTimeout(() => reject("ready_timeout"), 3000))
        ]);

        console.log("⚡ SDK READY!");
    } catch (e) {
        console.error("❌ Discord SDK no respondió:", e);
    }

    console.log("🔄 Autenticando...");

    // ========== AUTENTICAR ==========
    let auth;
    try {
        auth = await sdk.commands.authenticate({});
    } catch (err) {
        console.error("❌ Error al autenticar:", err);
        return;
    }

    if (auth && auth.user) {
        console.log("✅ Usuario autenticado:", auth.user.username);

        window.discordUserID = auth.user.id;
        window.discordUsername = auth.user.username;

        const frame = document.getElementById("game-frame").contentWindow;

        // Enviar al juego (iframe)
        frame.postMessage({
            type: "discord-auth",
            user: auth.user
        }, "*");

    } else {
        console.error("❌ No se pudo autenticar al usuario.");
    }

})();
