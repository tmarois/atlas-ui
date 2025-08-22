<?php

namespace Atlas\Laravel\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use ReflectionEnum;

class ExportEnumsCommand extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'atlas:export-enums';

    /**
     * The console command description.
     */
    protected $description = 'Export PHP enums to frontend';

    public function handle(): int
    {
        $config = config('atlas_enums');

        $enumPaths = $config['enum_paths'] ?? [];
        $outputPath = $config['output_path'] ?? resource_path('js/enums');
        $format = $config['format'] ?? 'ts';
        $banner = $config['banner'] ?? '';

        $exported = [];

        foreach ($enumPaths as $path) {
            if (! is_dir($path)) {
                continue;
            }

            $files = File::allFiles($path);

            foreach ($files as $file) {
                if ($file->getExtension() !== 'php') {
                    continue;
                }

                $relativePath = trim(str_replace($path, '', $file->getPathname()), DIRECTORY_SEPARATOR);
                $relativeDir = dirname($relativePath);
                $enumName = pathinfo($file->getFilename(), PATHINFO_FILENAME);

                $namespace = $this->getNamespace($file->getPathname());
                $class = $namespace ? $namespace.'\\'.$enumName : $enumName;

                if (! class_exists($class)) {
                    require_once $file->getPathname();
                }

                if (! enum_exists($class)) {
                    continue;
                }

                $reflection = new ReflectionEnum($class);
                $cases = $reflection->getCases();

                $content = $banner ? $banner."\n" : '';

                if ($format === 'ts') {
                    $content .= "export enum {$enumName} {\n";
                    foreach ($cases as $case) {
                        $value = $reflection->isBacked()
                            ? var_export($case->getBackingValue(), true)
                            : var_export($case->getName(), true);
                        $content .= "    {$case->getName()} = {$value},\n";
                    }
                    $content .= "}\n";
                } else {
                    $content .= "export const {$enumName} = {\n";
                    foreach ($cases as $case) {
                        $value = $reflection->isBacked()
                            ? var_export($case->getBackingValue(), true)
                            : var_export($case->getName(), true);
                        $content .= "    {$case->getName()}: {$value},\n";
                    }
                    $content .= "};\n";
                }

                $targetDir = $outputPath.($relativeDir !== '.' ? DIRECTORY_SEPARATOR.$relativeDir : '');
                File::ensureDirectoryExists($targetDir);
                $targetFile = $targetDir.DIRECTORY_SEPARATOR.$enumName.'.'.$format;
                File::put($targetFile, $content);

                $exported[] = [
                    'name' => $enumName,
                    'path' => str_replace('\\', '/', ($relativeDir !== '.' ? $relativeDir.'/' : '').$enumName),
                ];
            }
        }

        File::ensureDirectoryExists($outputPath);
        $indexFile = $outputPath.DIRECTORY_SEPARATOR.'index.'.$format;
        $index = $banner ? $banner."\n" : '';
        foreach ($exported as $enum) {
            $index .= "export { {$enum['name']} } from './{$enum['path']}';\n";
        }
        File::put($indexFile, $index);

        $this->info('Enums exported: '.count($exported));

        return self::SUCCESS;
    }

    protected function getNamespace(string $path): ?string
    {
        $content = File::get($path);
        if (preg_match('/^namespace\s+([^;]+);/m', $content, $matches)) {
            return trim($matches[1]);
        }

        return null;
    }
}

