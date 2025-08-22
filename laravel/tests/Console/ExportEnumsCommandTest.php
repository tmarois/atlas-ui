<?php

namespace Atlas\Laravel\Tests\Console;

use Illuminate\Support\Facades\File;
use Orchestra\Testbench\TestCase;

class ExportEnumsCommandTest extends TestCase
{
    protected string $enumDir;
    protected string $outputDir;

    protected function getPackageProviders($app): array
    {
        return [\Atlas\Laravel\AtlasServiceProvider::class];
    }

    protected function setUp(): void
    {
        parent::setUp();

        $this->enumDir = sys_get_temp_dir().'/atlas-enums';
        $this->outputDir = sys_get_temp_dir().'/atlas-enums-output';

        File::deleteDirectory($this->enumDir);
        File::deleteDirectory($this->outputDir);

        File::ensureDirectoryExists($this->enumDir.'/Billing');

        File::put($this->enumDir.'/Status.php', <<<'PHP'
<?php

namespace App\Enums;

enum Status: string
{
    case Draft = 'draft';
    case Published = 'published';
}
PHP);

        File::put($this->enumDir.'/Billing/InvoiceStatus.php', <<<'PHP'
<?php

namespace App\Enums\Billing;

enum InvoiceStatus: int
{
    case Paid = 1;
    case Unpaid = 0;
}
PHP);

        config()->set('atlas_enums.enum_paths', [$this->enumDir]);
        config()->set('atlas_enums.output_path', $this->outputDir);
        config()->set('atlas_enums.format', 'ts');
        config()->set('atlas_enums.banner', '// test');
    }

    public function test_exports_enums(): void
    {
        $this->artisan('atlas:export-enums')->assertExitCode(0);

        $statusFile = $this->outputDir.'/Status.ts';
        $invoiceFile = $this->outputDir.'/Billing/InvoiceStatus.ts';
        $indexFile = $this->outputDir.'/index.ts';

        $this->assertFileExists($statusFile);
        $this->assertFileExists($invoiceFile);
        $this->assertFileExists($indexFile);

        $this->assertStringContainsString('export enum Status', File::get($statusFile));
        $this->assertStringContainsString('export enum InvoiceStatus', File::get($invoiceFile));
        $this->assertStringContainsString("export { Status } from './Status';", File::get($indexFile));
        $this->assertStringContainsString("export { InvoiceStatus } from './Billing/InvoiceStatus';", File::get($indexFile));
    }
}

