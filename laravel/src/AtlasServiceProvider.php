<?php

namespace Atlas\Laravel;

use Atlas\Laravel\Console\Commands\ExportEnumsCommand;
use Illuminate\Support\ServiceProvider;

class AtlasServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__.'/../config/atlas_enums.php', 'atlas_enums');
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->publishes([
            __DIR__.'/../config/atlas_enums.php' => config_path('atlas_enums.php'),
        ], 'atlas-config');

        if ($this->app->runningInConsole()) {
            $this->commands([
                ExportEnumsCommand::class,
            ]);
        }
    }
}

